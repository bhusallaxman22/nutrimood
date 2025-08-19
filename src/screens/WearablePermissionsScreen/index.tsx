// Wearables permission management screen
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../../components/atoms/Button";
import GlassCard from "../../components/molecules/GlassCard";
import MaterialBackground from "../../components/templates/GlassBackground";
import {
  fetchWearableMetrics,
  getActiveProviders,
  requestWearablePermissions,
} from "../../services/wearables";
import {
  clearOAuthTokens,
  getOAuthTokens,
} from "../../services/wearables/tokenStorage";
import { spacing } from "../../theme/materialDesign";

import { styles } from "./styles";

interface ProviderStatus {
  name: string;
  displayName: string;
  isConnected: boolean;
  isLoading: boolean;
  emoji: string;
  description: string;
}

const WearablePermissionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const providerConfig: Record<
    string,
    { displayName: string; emoji: string; description: string }
  > = {
    apple_health: {
      displayName: "Apple Health",
      emoji: "🍎",
      description:
        "Heart rate, steps, sleep, SpO2 from Apple Watch and Health app",
    },
    google_fit: {
      displayName: "Google Fit",
      emoji: "🏃",
      description: "Activity, heart rate, and fitness data from Google Fit",
    },
    fitbit: {
      displayName: "Fitbit",
      emoji: "⌚",
      description: "Comprehensive health metrics from your Fitbit device",
    },
    garmin: {
      displayName: "Garmin",
      emoji: "🏋️",
      description: "Advanced fitness and wellness data from Garmin devices",
    },
  };

  const loadProviderStatuses = async () => {
    const activeProviders = getActiveProviders().filter(
      (name) => name !== "demo"
    );
    const statuses: ProviderStatus[] = [];

    for (const providerName of activeProviders) {
      const config = providerConfig[providerName];
      if (!config) continue;

      let isConnected = false;
      try {
        const tokens = await getOAuthTokens(providerName);
        isConnected = tokens !== null;
      } catch {
        isConnected = false;
      }

      statuses.push({
        name: providerName,
        displayName: config.displayName,
        isConnected,
        isLoading: false,
        emoji: config.emoji,
        description: config.description,
      });
    }

    setProviders(statuses);
  };

  useEffect(() => {
    loadProviderStatuses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProviderToggle = async (
    providerName: string,
    currentlyConnected: boolean
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setProviders((prev) =>
      prev.map((p) => (p.name === providerName ? { ...p, isLoading: true } : p))
    );

    try {
      if (currentlyConnected) {
        // Disconnect provider
        await clearOAuthTokens(providerName);
        Alert.alert(
          "Disconnected",
          `Successfully disconnected from ${
            providerConfig[providerName]?.displayName || providerName
          }`,
          [{ text: "OK" }]
        );
      } else {
        // Connect provider
        const result = await requestWearablePermissions();
        if (result.granted.includes(providerName)) {
          Alert.alert(
            "Connected",
            `Successfully connected to ${
              providerConfig[providerName]?.displayName || providerName
            }`,
            [{ text: "OK" }]
          );
        } else {
          Alert.alert(
            "Connection Failed",
            `Failed to connect to ${
              providerConfig[providerName]?.displayName || providerName
            }. Please check your permissions and try again.`,
            [{ text: "OK" }]
          );
        }
      }
    } catch (error) {
      console.error("Provider toggle error:", error);
      Alert.alert(
        "Error",
        "An error occurred while managing the connection. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setProviders((prev) =>
        prev.map((p) =>
          p.name === providerName ? { ...p, isLoading: false } : p
        )
      );
      await loadProviderStatuses();
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      await fetchWearableMetrics(true);
      await loadProviderStatuses();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Refresh error:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRequestAllPermissions = async () => {
    setIsRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    try {
      const result = await requestWearablePermissions();
      const { granted, denied } = result;

      if (granted.length > 0) {
        Alert.alert(
          "Permissions Granted",
          `Successfully connected to: ${granted
            .map((p) => providerConfig[p]?.displayName || p)
            .join(", ")}`,
          [{ text: "Great!" }]
        );
      }

      if (denied.length > 0) {
        Alert.alert(
          "Some Permissions Denied",
          `Could not connect to: ${denied
            .map((p) => providerConfig[p]?.displayName || p)
            .join(", ")}. You can try again or connect them individually.`,
          [{ text: "OK" }]
        );
      }

      if (granted.length === 0 && denied.length === 0) {
        Alert.alert(
          "No Providers Available",
          "No wearable providers are currently available on this device.",
          [{ text: "OK" }]
        );
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Request permissions error:", error);
      Alert.alert(
        "Error",
        "An error occurred while requesting permissions. Please try again.",
        [{ text: "OK" }]
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsRefreshing(false);
      await loadProviderStatuses();
    }
  };

  return (
    <MaterialBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Wearable Connections</Text>
            <Text style={styles.subtitle}>
              Connect your fitness devices and health apps to get personalized
              nutrition insights based on your activity, sleep, and wellness
              metrics.
            </Text>
          </View>

          <GlassCard style={styles.card}>
            <Text style={styles.sectionTitle}>Available Providers</Text>

            {providers.length === 0 ? (
              <Text style={styles.noProvidersText}>
                No wearable providers are available on this device. Make sure
                you have the appropriate health apps installed.
              </Text>
            ) : (
              providers.map((provider) => (
                <View key={provider.name} style={styles.providerRow}>
                  <View style={styles.providerInfo}>
                    <Text style={styles.providerEmoji}>{provider.emoji}</Text>
                    <View style={styles.providerDetails}>
                      <Text style={styles.providerName}>
                        {provider.displayName}
                      </Text>
                      <Text style={styles.providerDescription}>
                        {provider.description}
                      </Text>
                      <Text style={styles.providerStatus}>
                        {provider.isConnected
                          ? "✅ Connected"
                          : "⚫ Not connected"}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={provider.isConnected}
                    onValueChange={() =>
                      handleProviderToggle(provider.name, provider.isConnected)
                    }
                    disabled={provider.isLoading}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={provider.isConnected ? "#f5dd4b" : "#f4f3f4"}
                  />
                </View>
              ))
            )}

            <View style={styles.buttonContainer}>
              <Button
                title={isRefreshing ? "Requesting..." : "Connect All Available"}
                onPress={handleRequestAllPermissions}
                disabled={isRefreshing}
                style={{ marginBottom: spacing.md }}
              />
              <Button
                title={isRefreshing ? "Refreshing..." : "Refresh Data"}
                onPress={handleRefreshAll}
                variant="outline"
                disabled={isRefreshing}
              />
            </View>
          </GlassCard>

          <GlassCard style={styles.card}>
            <Text style={styles.sectionTitle}>Privacy & Data</Text>
            <Text style={styles.privacyText}>
              • Your health data remains private and is only used to generate
              personalized nutrition suggestions
            </Text>
            <Text style={styles.privacyText}>
              • Data is processed locally on your device when possible
            </Text>
            <Text style={styles.privacyText}>
              • You can disconnect any provider at any time
            </Text>
            <Text style={styles.privacyText}>
              • No health data is shared with third parties without your consent
            </Text>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </MaterialBackground>
  );
};

export default WearablePermissionsScreen;
