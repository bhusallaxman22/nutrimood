// Fitbit provider implementation using OAuth 2.0 and REST API
import * as WebBrowser from "expo-web-browser";
import type { WearableMetrics } from "../../wearables";
import {
  clearOAuthTokens,
  getOAuthTokens,
  isTokenValid,
  storeOAuthTokens,
} from "../tokenStorage";

// Fitbit OAuth configuration - replace with your app credentials
const FITBIT_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_FITBIT_CLIENT_ID,
  clientSecret: process.env.EXPO_PUBLIC_FITBIT_CLIENT_SECRET,
  redirectUri: "com.bhusallaxman22.nutritionapp://oauth/fitbit",
  scope: "activity heartrate oxygen_saturation profile sleep",
  authUrl: "https://www.fitbit.com/oauth2/authorize",
  tokenUrl: "https://api.fitbit.com/oauth2/token",
  apiUrl: "https://api.fitbit.com/1/user/-",
};

const exchangeCodeForTokens = async (code: string): Promise<boolean> => {
  try {
    const response = await fetch(FITBIT_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${FITBIT_CONFIG.clientId}:${FITBIT_CONFIG.clientSecret}`
        ).toString("base64")}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
        FITBIT_CONFIG.redirectUri
      )}`,
    });

    if (!response.ok) {
      console.error("Fitbit token exchange failed:", response.status);
      return false;
    }

    const data = await response.json();
    await storeOAuthTokens("fitbit", {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      scope: data.scope,
    });

    return true;
  } catch (error) {
    console.error("Fitbit token exchange error:", error);
    return false;
  }
};

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const tokens = await getOAuthTokens("fitbit");
    if (!tokens?.refreshToken) return false;

    const response = await fetch(FITBIT_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${FITBIT_CONFIG.clientId}:${FITBIT_CONFIG.clientSecret}`
        ).toString("base64")}`,
      },
      body: `grant_type=refresh_token&refresh_token=${tokens.refreshToken}`,
    });

    if (!response.ok) {
      console.error("Fitbit token refresh failed:", response.status);
      await clearOAuthTokens("fitbit");
      return false;
    }

    const data = await response.json();
    await storeOAuthTokens("fitbit", {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || tokens.refreshToken,
      expiresAt: Date.now() + data.expires_in * 1000,
      scope: data.scope,
    });

    return true;
  } catch (error) {
    console.error("Fitbit token refresh error:", error);
    return false;
  }
};

export const fitbitProvider = {
  name: "fitbit",
  async isAvailable() {
    const tokens = await getOAuthTokens("fitbit");
    return tokens !== null;
  },
  async requestPermissions() {
    try {
      // Check if we already have valid tokens
      const existingTokens = await getOAuthTokens("fitbit");
      if (existingTokens && isTokenValid(existingTokens)) {
        return true;
      }

      // Try to refresh if we have a refresh token
      if (existingTokens?.refreshToken) {
        const refreshed = await refreshAccessToken();
        if (refreshed) return true;
      }

      // Start OAuth flow
      const authUrl = `${FITBIT_CONFIG.authUrl}?client_id=${
        FITBIT_CONFIG.clientId
      }&response_type=code&scope=${encodeURIComponent(
        FITBIT_CONFIG.scope
      )}&redirect_uri=${encodeURIComponent(FITBIT_CONFIG.redirectUri)}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        FITBIT_CONFIG.redirectUri
      );

      if (result.type === "success") {
        const url = new URL(result.url);
        const code = url.searchParams.get("code");
        if (code) {
          return await exchangeCodeForTokens(code);
        }
      }

      return false;
    } catch (error) {
      console.error("Fitbit permission error:", error);
      return false;
    }
  },
  async fetchMetrics(): Promise<Partial<WearableMetrics> | null> {
    try {
      const tokens = await getOAuthTokens("fitbit");
      if (!tokens || !isTokenValid(tokens)) {
        console.log("No valid Fitbit tokens");
        return null;
      }

      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const headers = {
        Authorization: `Bearer ${tokens.accessToken}`,
        Accept: "application/json",
      };

      const [heartRate, steps, calories, sleep, spo2] =
        await Promise.allSettled([
          fetch(
            `${FITBIT_CONFIG.apiUrl}/activities/heart/date/${today}/1d.json`,
            { headers }
          ),
          fetch(
            `${FITBIT_CONFIG.apiUrl}/activities/steps/date/${today}/1d.json`,
            { headers }
          ),
          fetch(
            `${FITBIT_CONFIG.apiUrl}/activities/calories/date/${today}/1d.json`,
            { headers }
          ),
          fetch(`${FITBIT_CONFIG.apiUrl}/sleep/date/${today}.json`, {
            headers,
          }),
          fetch(`${FITBIT_CONFIG.apiUrl}/spo2/date/${today}.json`, { headers }),
        ]);

      const metrics: Partial<WearableMetrics> = {
        timestamp: Date.now(),
      };

      // Process heart rate
      if (heartRate.status === "fulfilled" && heartRate.value.ok) {
        const hrData = await heartRate.value.json();
        if (hrData["activities-heart"]?.[0]?.value?.heartRateZones) {
          const zones = hrData["activities-heart"][0].value.heartRateZones;
          const restingHR =
            hrData["activities-heart"][0].value.restingHeartRate;
          if (restingHR) metrics.restingHeartRate = restingHR;

          // Estimate current HR from fat burn zone if available
          const fatBurnZone = zones.find((z: any) => z.name === "Fat Burn");
          if (fatBurnZone?.minutes > 0) {
            metrics.heartRate = Math.round(
              (fatBurnZone.min + fatBurnZone.max) / 2
            );
          }
        }
      }

      // Process steps
      if (steps.status === "fulfilled" && steps.value.ok) {
        const stepsData = await steps.value.json();
        const todaySteps = stepsData["activities-steps"]?.[0]?.value;
        if (todaySteps) metrics.stepsToday = parseInt(todaySteps);
      }

      // Process calories
      if (calories.status === "fulfilled" && calories.value.ok) {
        const calData = await calories.value.json();
        const todayCalories = calData["activities-calories"]?.[0]?.value;
        if (todayCalories)
          metrics.caloriesBurnedToday = parseInt(todayCalories);
      }

      // Process sleep
      if (sleep.status === "fulfilled" && sleep.value.ok) {
        const sleepData = await sleep.value.json();
        const sleepSummary = sleepData.summary;
        if (sleepSummary?.totalTimeInBed) {
          metrics.sleepHoursLastNight = sleepSummary.totalTimeInBed / 60; // Convert minutes to hours
        }
      }

      // Process SpO2
      if (spo2.status === "fulfilled" && spo2.value.ok) {
        const spo2Data = await spo2.value.json();
        const latestSpo2 = spo2Data[0]?.value?.avg;
        if (latestSpo2) metrics.spo2 = Math.round(latestSpo2);
      }

      return Object.keys(metrics).length > 1 ? metrics : null;
    } catch (error) {
      console.error("Fitbit fetch error:", error);
      return null;
    }
  },
};
