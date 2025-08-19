import { NutritionSuggestion } from '../services/openai';

export type TabNavigatorParamList = {
    Home: undefined;
    Dashboard: undefined;
    Mindfulness: undefined;
    Social: undefined;
    Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  Suggestion: { suggestion: NutritionSuggestion; mood: string; goal: string };
  SuggestionsHistory: undefined;
  Dashboard: undefined;
  Mindfulness: undefined;
  ProfileSettings: undefined;
  WearablePermissions: undefined;
};
