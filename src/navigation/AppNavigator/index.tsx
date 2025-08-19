import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import LoginScreen from "../../screens/LoginScreen";
import SuggestionScreen from "../../screens/NewSuggestionScreen";
import OnboardingScreen from "../../screens/OnboardingScreen";
import ProfileSettingsScreen from "../../screens/ProfileSettingsScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import SuggestionsHistoryScreen from "../../screens/SuggestionsHistoryScreen";
import WearablePermissionsScreen from "../../screens/WearablePermissionsScreen";
import { colors } from "../../theme/materialDesign";
import TabNavigator from "../TabNavigator";
import { RootStackParamList } from "../types";
import { styles } from "./styles";
import {
  checkOnboardingStatus,
  logAuthState,
  setOnboardingComplete,
} from "./utils";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    initializeOnboardingStatus();
  }, []);

  const initializeOnboardingStatus = async () => {
    const status = await checkOnboardingStatus();
    setHasSeenOnboarding(status);
  };

  const handleOnboardingComplete = async () => {
    await setOnboardingComplete();
    setHasSeenOnboarding(true);
  };

  logAuthState(user, isLoading, isAuthenticated, hasSeenOnboarding);

  if (isLoading || hasSeenOnboarding === null) {
    console.log("AppNavigator - Showing loading screen");
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <LinearGradient
          colors={[colors.primary, colors.primaryVariant]}
          style={styles.loadingGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ActivityIndicator
            size="large"
            color={colors.surface}
            style={styles.loadingIndicator}
          />
        </LinearGradient>
      </View>
    );
  }

  console.log(
    "AppNavigator - Rendering stack navigator, isAuthenticated:",
    isAuthenticated
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      {isAuthenticated ? (
        <>
          {!hasSeenOnboarding ? (
            <Stack.Screen name="Onboarding">
              {() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="MainTabs" component={TabNavigator} />
              <Stack.Screen name="Suggestion" component={SuggestionScreen} />
              <Stack.Screen
                name="SuggestionsHistory"
                component={SuggestionsHistoryScreen}
              />
              <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettingsScreen}
              />
              <Stack.Screen
                name="WearablePermissions"
                component={WearablePermissionsScreen}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
