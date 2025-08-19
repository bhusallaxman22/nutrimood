// Garmin provider implementation using OAuth and Health API
import * as WebBrowser from "expo-web-browser";
import type { WearableMetrics } from "../../wearables";
import {
  getOAuthTokens,
  isTokenValid,
  storeOAuthTokens,
} from "../tokenStorage";

// Garmin Connect IQ OAuth configuration - replace with your app credentials
const GARMIN_CONFIG = {
  consumerKey:
    process.env.EXPO_PUBLIC_GARMIN_CONSUMER_KEY || "your_garmin_consumer_key",
  consumerSecret:
    process.env.EXPO_PUBLIC_GARMIN_CONSUMER_SECRET ||
    "your_garmin_consumer_secret",
  redirectUri: "com.bhusallaxman22.nutritionapp://oauth/garmin",
  requestTokenUrl:
    "https://connectapi.garmin.com/oauth-service/oauth/request_token",
  authUrl: "https://connect.garmin.com/oauthConfirm",
  accessTokenUrl:
    "https://connectapi.garmin.com/oauth-service/oauth/access_token",
  apiUrl: "https://apis.garmin.com/wellness-api/rest",
};

// OAuth 1.0a signature generation (simplified - use proper OAuth library in production)
const generateOAuthSignature = (
  method: string,
  url: string,
  params: Record<string, string>
): string => {
  // This is a simplified implementation - use proper OAuth 1.0a signing in production
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(sortedParams)}`;
  const signingKey = `${encodeURIComponent(GARMIN_CONFIG.consumerSecret)}&`;

  // In production, use proper HMAC-SHA1 signing
  return Buffer.from(baseString + signingKey)
    .toString("base64")
    .substring(0, 20);
};

const requestOAuthToken = async (): Promise<{
  token: string;
  tokenSecret: string;
} | null> => {
  try {
    const oauthParams: Record<string, string> = {
      oauth_callback: GARMIN_CONFIG.redirectUri,
      oauth_consumer_key: GARMIN_CONFIG.consumerKey,
      oauth_nonce: Math.random().toString(36).substring(7),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_version: "1.0",
    };

    const signature = generateOAuthSignature(
      "POST",
      GARMIN_CONFIG.requestTokenUrl,
      oauthParams
    );
    oauthParams.oauth_signature = signature;

    const authHeader =
      "OAuth " +
      Object.entries(oauthParams)
        .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
        .join(", ");

    const response = await fetch(GARMIN_CONFIG.requestTokenUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      console.error("Garmin request token failed:", response.status);
      return null;
    }

    const responseText = await response.text();
    const params = new URLSearchParams(responseText);
    const token = params.get("oauth_token");
    const tokenSecret = params.get("oauth_token_secret");

    if (token && tokenSecret) {
      return { token, tokenSecret };
    }

    return null;
  } catch (error) {
    console.error("Garmin request token error:", error);
    return null;
  }
};

export const garminProvider = {
  name: "garmin",
  async isAvailable() {
    const tokens = await getOAuthTokens("garmin");
    return tokens !== null;
  },
  async requestPermissions() {
    try {
      // Check if we already have valid tokens
      const existingTokens = await getOAuthTokens("garmin");
      if (existingTokens && isTokenValid(existingTokens)) {
        return true;
      }

      // Start OAuth 1.0a flow
      const requestToken = await requestOAuthToken();
      if (!requestToken) {
        console.error("Failed to get Garmin request token");
        return false;
      }

      // Store request token temporarily
      await storeOAuthTokens("garmin_temp", {
        accessToken: requestToken.token,
        refreshToken: requestToken.tokenSecret,
      });

      const authUrl = `${GARMIN_CONFIG.authUrl}?oauth_token=${requestToken.token}`;
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        GARMIN_CONFIG.redirectUri
      );

      if (result.type === "success") {
        const url = new URL(result.url);
        const verifier = url.searchParams.get("oauth_verifier");

        if (verifier) {
          // Exchange for access token (simplified - implement proper OAuth 1.0a flow)
          await storeOAuthTokens("garmin", {
            accessToken: requestToken.token,
            refreshToken: requestToken.tokenSecret,
            expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
          });
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Garmin permission error:", error);
      return false;
    }
  },
  async fetchMetrics(): Promise<Partial<WearableMetrics> | null> {
    try {
      const tokens = await getOAuthTokens("garmin");
      if (!tokens || !isTokenValid(tokens)) {
        console.log("No valid Garmin tokens");
        return null;
      }

      // Note: This is a simplified implementation
      // In production, implement proper OAuth 1.0a signed requests
      // Garmin API calls would go here with proper OAuth 1.0a signing
      console.log(
        "Garmin API integration requires full OAuth 1.0a implementation"
      );

      return null;
    } catch (error) {
      console.error("Garmin fetch error:", error);
      return null;
    }
  },
};
