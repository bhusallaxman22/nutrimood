import { OPENAI_API_KEY } from "@env";
import axios from "axios";
import moodToNutrition from "./mood-to-nutrition.json";
import { fetchWearableMetrics, summarizeWearableContext } from "./wearables";

const openai = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
});

// Define the structure for JSON nutrition suggestions
export interface NutritionSuggestion {
  title: string;
  emoji: string;
  meal: {
    name: string;
    description: string;
    prepTime: string;
  };
  ingredients: {
    name: string;
    benefit: string;
    emoji: string;
  }[];
  timing: {
    when: string;
    why: string;
  };
  preparation: string[];
  tips: string[];
  nutrition: {
    calories: string;
    mainNutrients: string[];
  };
}

export const getNutritionSuggestion = async (
  mood: string,
  goal: string
): Promise<NutritionSuggestion> => {
  const moodInfo = (moodToNutrition as any)[mood];

  if (!moodInfo) {
    throw new Error(`No nutrition data found for mood: ${mood}`);
  }

  // Fetch wearable metrics (non-critical)
  let wearableContext = "";
  try {
    const metrics = await fetchWearableMetrics();
    wearableContext = summarizeWearableContext(metrics);
  } catch {}

  const prompt = `I am feeling ${mood} and my goal is to ${goal}. I know that for my mood, I should eat foods like ${moodInfo.foods.join(
    ", "
  )} which are rich in ${moodInfo.nutrients.join(", ")}.

Wearable context: ${wearableContext || "No wearable metrics available"}.

Guidelines for using metrics:
- Elevated heart rate or poor sleep -> emphasize calming, magnesium, B vitamins, hydration.
- Low steps / activity -> suggest energizing but light, balanced macro meal.
- Low SpO2 (<95) -> consider iron + vitamin C pairing and oxygen-supportive nutrients.
- High readiness & activity minutes -> allow complex carbs + protein for recovery.

Please provide a nutrition suggestion in the following JSON format (respond ONLY with valid JSON, no markdown):

{
  "title": "A catchy title for this suggestion",
  "emoji": "One relevant emoji",
  "meal": {
    "name": "Name of the meal/snack",
    "description": "One sentence description (max 50 words)",
    "prepTime": "e.g., 5 minutes"
  },
  "ingredients": [
    {
      "name": "Ingredient name",
      "benefit": "How it helps with mood/goal (max 30 words)",
      "emoji": "Relevant emoji"
    }
  ],
  "timing": {
    "when": "Best time to eat this",
    "why": "Brief reason (max 25 words)"
  },
  "preparation": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "tips": [
    "Quick tip 1 (max 25 words)",
    "Quick tip 2 (max 25 words)"
  ],
  "nutrition": {
    "calories": "Approximate calories",
    "mainNutrients": ["nutrient1", "nutrient2", "nutrient3"]
  }
}

Keep it concise, practical, and engaging for someone feeling ${mood} who wants to ${goal}.`;

  try {
    const response = await openai.post("/chat/completions", {
      model: "google/gemma-3-4b-it",
      messages: [
        {
          role: "system",
          content: `You are a nutrition expert. CRITICAL: You must respond with ONLY valid JSON - no additional text, no markdown, no explanations. 

Your response must be a single JSON object that starts with { and ends with }. Do not include any text before or after the JSON.

The JSON must follow this exact structure:
{
  "title": "string",
  "emoji": "single emoji",
  "meal": {
    "name": "string",
    "description": "string under 50 words",
    "prepTime": "string like '5 minutes'"
  },
  "ingredients": [
    {
      "name": "string",
      "benefit": "string under 30 words", 
      "emoji": "single emoji"
    }
  ],
  "timing": {
    "when": "string",
    "why": "string under 25 words"
  },
  "preparation": ["step1", "step2", "step3"],
  "tips": ["tip1 under 25 words", "tip2 under 25 words"],
  "nutrition": {
    "calories": "string like '300-400 calories'",
    "mainNutrients": ["nutrient1", "nutrient2", "nutrient3"]
  }
}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const suggestionText = response.data.choices[0].message.content.trim();
    console.log("Generated suggestion:", suggestionText); // Clean and parse the JSON response
    try {
      // Remove any markdown code blocks or extra text
      let cleanedText = suggestionText;

      // Remove markdown code blocks if present
      cleanedText = cleanedText
        .replace(/```json\s*/g, "")
        .replace(/```\s*$/g, "");

      // Remove any potential explanatory text before/after JSON
      cleanedText = cleanedText.replace(/^[^{]*/, "").replace(/[^}]*$/, "");

      // Find JSON object boundaries
      const startIndex = cleanedText.indexOf("{");
      const lastIndex = cleanedText.lastIndexOf("}");

      if (startIndex !== -1 && lastIndex !== -1 && startIndex < lastIndex) {
        cleanedText = cleanedText.substring(startIndex, lastIndex + 1);
      }

      // Additional cleaning: remove any non-JSON characters that might have slipped through
      cleanedText = cleanedText.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Remove control characters
      cleanedText = cleanedText.replace(/\n\s*\n/g, "\n"); // Remove empty lines

      console.log("Cleaned suggestion text:", cleanedText);

      const suggestion = JSON.parse(cleanedText) as NutritionSuggestion;

      // Validate required fields
      if (!suggestion.title || !suggestion.meal || !suggestion.ingredients) {
        throw new Error("Invalid suggestion structure");
      }

      return suggestion;
    } catch (parseError) {
      console.error(
        "Error parsing JSON response:",
        parseError,
        "Original text:",
        suggestionText
      );
      return generateFallbackSuggestion(mood, goal, moodInfo);
    }
  } catch (error) {
    console.error("Error getting nutrition suggestion:", error);
    return generateFallbackSuggestion(mood, goal, moodInfo);
  }
};

const generateFallbackSuggestion = (
  mood: string,
  goal: string,
  moodInfo: any
): NutritionSuggestion => {
  const timeOfDay = new Date().getHours();
  let mealType = "snack";
  if (timeOfDay < 10) mealType = "breakfast";
  else if (timeOfDay < 14) mealType = "lunch";
  else if (timeOfDay < 18) mealType = "afternoon snack";
  else mealType = "dinner";

  const mainFood = moodInfo.foods[0] || "healthy food";
  const secondFood = moodInfo.foods[1] || "nutritious ingredient";
  const nutrient1 = moodInfo.nutrients[0] || "essential nutrients";
  const nutrient2 = moodInfo.nutrients[1] || nutrient1;

  return {
    title: `Perfect ${
      mealType.charAt(0).toUpperCase() + mealType.slice(1)
    } for Your ${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood`,
    emoji: "🌟",
    meal: {
      name: `${mainFood} Power Bowl`,
      description: `A nourishing combination featuring ${mainFood.toLowerCase()} and ${secondFood.toLowerCase()} to help you ${goal.toLowerCase()}.`,
      prepTime: "10 minutes",
    },
    ingredients: [
      {
        name: mainFood,
        benefit: `Rich in ${nutrient1}, perfect for boosting your mood`,
        emoji: "🥗",
      },
      {
        name: secondFood,
        benefit: `Contains ${nutrient2}, supporting your goal to ${goal.toLowerCase()}`,
        emoji: "💪",
      },
      {
        name: "Healthy fats",
        benefit: "Nuts or seeds for sustained energy and brain health",
        emoji: "🌰",
      },
    ],
    timing: {
      when: `Best enjoyed ${
        timeOfDay < 12
          ? "in the morning"
          : timeOfDay < 17
          ? "in the afternoon"
          : "in the evening"
      }`,
      why: `Optimal time to help you ${goal.toLowerCase()} effectively`,
    },
    preparation: [
      `Combine ${mainFood.toLowerCase()} and ${secondFood.toLowerCase()} in a bowl`,
      "Add a drizzle of healthy oil or your favorite dressing",
      "Top with nuts or seeds for extra nutrition",
      "Enjoy mindfully to enhance mood-boosting benefits",
    ],
    tips: [
      "Stay hydrated with plenty of water throughout the day",
      "Eat slowly and mindfully to maximize nutritional absorption",
    ],
    nutrition: {
      calories: "300-400 calories",
      mainNutrients: [nutrient1, nutrient2, "healthy fats"],
    },
  };
};
