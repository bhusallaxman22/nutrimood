// Google Fit provider implementation using react-native-google-fit
import { Platform } from "react-native";
import type { WearableMetrics } from "../../wearables";

// Dynamic import to avoid crashes on iOS
let GoogleFit: any = null;
if (Platform.OS === "android") {
  try {
    GoogleFit = require("react-native-google-fit"); // eslint-disable-line @typescript-eslint/no-require-imports
  } catch {
    // Module not available - keep GoogleFit as null
  }
}

const FITNESS_OPTIONS = {
  scopes: [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
  ],
};

export const googleFitProvider = {
  name: "google_fit",
  async isAvailable() {
    return Platform.OS === "android" && GoogleFit !== null;
  },
  async requestPermissions() {
    if (!GoogleFit) return false;
    try {
      const authResult = await GoogleFit.authorize(FITNESS_OPTIONS);
      return authResult.success === true;
    } catch (error) {
      console.error("Google Fit authorization error:", error);
      return false;
    }
  },
  async fetchMetrics(): Promise<Partial<WearableMetrics> | null> {
    if (!GoogleFit) return null;

    try {
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const isAuthorized = await GoogleFit.isAuthorized();
      if (!isAuthorized) {
        console.log("Google Fit not authorized");
        return null;
      }

      const [steps, heartRate, calories, distance] = await Promise.allSettled([
        // Steps today
        GoogleFit.getDailyStepCountSamples({
          startDate: startOfToday.toISOString(),
          endDate: now.toISOString(),
        }),
        // Heart rate samples
        GoogleFit.getHeartRateSamples({
          startDate: yesterday.toISOString(),
          endDate: now.toISOString(),
        }),
        // Calories burned
        GoogleFit.getDailyCalorieSamples({
          startDate: startOfToday.toISOString(),
          endDate: now.toISOString(),
        }),
        // Distance/activity
        GoogleFit.getDailyDistanceSamples({
          startDate: startOfToday.toISOString(),
          endDate: now.toISOString(),
        }),
      ]);

      const metrics: Partial<WearableMetrics> = {
        timestamp: Date.now(),
      };

      // Process steps
      if (steps.status === "fulfilled" && steps.value?.length > 0) {
        const todaySteps = steps.value.find(
          (s: any) => s.source === "com.google.android.gms:estimated_steps"
        );
        if (todaySteps?.steps?.length > 0) {
          metrics.stepsToday = todaySteps.steps.reduce(
            (total: number, step: any) => total + step.value,
            0
          );
        }
      }

      // Process heart rate - get latest sample
      if (heartRate.status === "fulfilled" && heartRate.value?.length > 0) {
        const latestHR = heartRate.value[heartRate.value.length - 1];
        if (latestHR?.value) {
          metrics.heartRate = Math.round(latestHR.value);
        }
      }

      // Process calories
      if (calories.status === "fulfilled" && calories.value?.length > 0) {
        const totalCalories = calories.value.reduce(
          (total: number, cal: any) => {
            return total + (cal.calorie || 0);
          },
          0
        );
        metrics.caloriesBurnedToday = Math.round(totalCalories);
      }

      // Estimate active minutes from distance/activity (simplified)
      if (distance.status === "fulfilled" && distance.value?.length > 0) {
        const totalDistance = distance.value.reduce(
          (total: number, dist: any) => {
            return total + (dist.distance || 0);
          },
          0
        );
        // Rough estimate: 1km = ~10 minutes of activity
        metrics.activeMinutesToday = Math.round(totalDistance / 100); // Convert meters to rough active minutes
      }

      return Object.keys(metrics).length > 1 ? metrics : null;
    } catch (error) {
      console.error("Google Fit fetch error:", error);
      return null;
    }
  },
};
