import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Haptics from "expo-haptics";
import Button from "../../components/atoms/Button";
import GlassCard from "../../components/molecules/GlassCard";
import MaterialBackground from "../../components/templates/GlassBackground";
import { TabNavigatorParamList } from "../../navigation/types";
import { auth, db } from "../../services/firebase";
import {
  fetchWearableMetrics,
  WearableMetrics,
} from "../../services/wearables";
import { wearableBackgroundService } from "../../services/wearables/backgroundService";
import { spacing } from "../../theme/materialDesign";
import {
  animateStats,
  getAverageMood,
  getMoodTrend,
  getStreakDays,
  moodToValue,
} from "../MoodTrendsScreen/utils";

import { styles } from "./styles";
import { MoodData } from "./types";
import {
  generateChartData,
  getChartConfig,
  getGreeting,
  getUserDisplayName,
  moodColors,
} from "./utils";

// Dynamically import chart only if available (avoids bundling issues)
const useOptionalChart = () => {
  const [ChartComp, setChartComp] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    import("react-native-chart-kit")
      .then((mod) => {
        if (mounted) setChartComp(mod.LineChart);
      })
      .catch(() => {
        /* silently ignore */
      });
    return () => {
      mounted = false;
    };
  }, []);
  return ChartComp;
};

type DashboardScreenNavigationProp = BottomTabNavigationProp<
  TabNavigatorParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const LineChartRef = useOptionalChart();
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [recentMood, setRecentMood] = useState<string | null>(null);
  const [wearableMetrics, setWearableMetrics] =
    useState<WearableMetrics | null>(null);
  const [wearablesLoading, setWearablesLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const fetchDashboardData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        setUserName(getUserDisplayName(user));

        const q = query(
          collection(db, "moods"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data: MoodData[] = querySnapshot.docs.map(
          (doc) => doc.data() as MoodData
        );
        setMoodData(data);

        if (data.length > 0) {
          setRecentMood(data[0].mood);
        }
      }
    } catch (err) {
      setError("Failed to fetch mood data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data once
  useEffect(() => {
    fetchDashboardData();
    (async () => {
      setWearablesLoading(true);
      const data = await fetchWearableMetrics();
      setWearableMetrics(data);
      setWearablesLoading(false);
    })();
  }, []);

  // Animate once when loading finishes
  useEffect(() => {
    if (!loading) animateStats(statsAnimations);
  }, [loading, statsAnimations]);

  // Initialize background service
  useEffect(() => {
    wearableBackgroundService.initialize();
    return () => wearableBackgroundService.cleanup();
  }, []);

  const renderChart = (LineChartComp: any) => {
    if (!LineChartComp) {
      return (
        <Text style={styles.chartErrorText}>
          Chart library not available. Please install react-native-chart-kit.
        </Text>
      );
    }
    if (moodData.length < 2) {
      return (
        <Text style={styles.chartErrorText}>
          Not enough data to display a chart. Log your mood for a few days!
        </Text>
      );
    }

    const chartData = generateChartData(moodData);
    const chartConfig = getChartConfig();

    return (
      <LineChartComp
        data={chartData}
        width={Dimensions.get("window").width - spacing.lg * 2}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    );
  };

  if (loading) {
    return (
      <MaterialBackground>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      </MaterialBackground>
    );
  }

  if (error) {
    return (
      <MaterialBackground>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </MaterialBackground>
    );
  }

  // Derive analytics metrics (reuse MoodTrends logic)
  const recentMoods = moodData; // reuse directly
  const averageMood = getAverageMood(recentMoods as any);
  const streakDays = getStreakDays(recentMoods as any);
  const numericData = moodData.length
    ? moodData
        .slice()
        .reverse()
        .map((entry) => moodToValue[entry.mood] || 0)
    : [];
  const trendDataset = { datasets: [{ data: numericData }] } as any;
  const moodTrend = getMoodTrend(trendDataset);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    const wm = await fetchWearableMetrics(true);
    setWearableMetrics(wm);
    setRefreshing(false);
  };

  return (
    <MaterialBackground>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: spacing.xxxl + 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Text style={styles.greetingText}>
              {getGreeting()}, {userName}
            </Text>
            <Text style={styles.subtitleText}>
              Here&apos;s your wellness snapshot
            </Text>
          </View>

          {/* Enhanced Analytics Stat Cards (shared design with MoodTrends) */}
          <View style={styles.statsGrid}>
            {/* Total Entries */}
            <Animated.View
              style={{
                opacity: statsAnimations[0],
                transform: [
                  { scale: statsAnimations[0] },
                  {
                    rotateY: statsAnimations[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["90deg", "0deg"],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.statCard}
                activeOpacity={0.9}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
              >
                <View
                  style={[
                    styles.enhancedStatCard,
                    { backgroundColor: "#667eea" },
                  ]}
                >
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statEmoji}>📊</Text>
                    <View style={styles.statIconGlow} />
                  </View>
                  <Text style={styles.enhancedStatValue}>
                    {moodData.length}
                  </Text>
                  <Text style={styles.enhancedStatLabel}>Total Entries</Text>
                  <View style={styles.statProgressBar}>
                    <View
                      style={[
                        styles.statProgressFill,
                        {
                          width: `${Math.min(
                            100,
                            (moodData.length / 50) * 100
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.statSubtext}>
                    {moodData.length > 30 ? "Great tracking!" : "Keep logging!"}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Average Mood */}
            <Animated.View
              style={{
                opacity: statsAnimations[1],
                transform: [
                  { scale: statsAnimations[1] },
                  {
                    rotateY: statsAnimations[1].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["90deg", "0deg"],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.statCard}
                activeOpacity={0.9}
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }
              >
                <View
                  style={[
                    styles.enhancedStatCard,
                    { backgroundColor: "#ffecd2" },
                  ]}
                >
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statEmoji}>🎯</Text>
                    <View style={styles.statIconGlow} />
                  </View>
                  <Text
                    style={[styles.enhancedStatValue, { color: "#8B4513" }]}
                  >
                    {averageMood}
                  </Text>
                  <Text
                    style={[styles.enhancedStatLabel, { color: "#A0522D" }]}
                  >
                    Average Mood
                  </Text>
                  <View style={styles.moodIndicatorDots}>
                    {["Very Low", "Low", "Moderate", "Good", "Excellent"].map(
                      (level) => (
                        <View
                          key={level}
                          style={[
                            styles.moodDot,
                            {
                              backgroundColor:
                                averageMood === level
                                  ? "#8B4513"
                                  : "rgba(139,69,19,0.3)",
                            },
                          ]}
                        />
                      )
                    )}
                  </View>
                  <Text style={[styles.statSubtext, { color: "#A0522D" }]}>
                    {moodData.length > 0 ? "Keep it up!" : "Start tracking"}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Mood Trend */}
            <Animated.View
              style={{
                opacity: statsAnimations[2],
                transform: [
                  { scale: statsAnimations[2] },
                  {
                    rotateY: statsAnimations[2].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["90deg", "0deg"],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.statCard}
                activeOpacity={0.9}
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }
              >
                <View
                  style={[
                    styles.enhancedStatCard,
                    {
                      backgroundColor:
                        moodTrend === "improving"
                          ? "#a8edea"
                          : moodTrend === "declining"
                          ? "#ffecd2"
                          : "#d299c2",
                    },
                  ]}
                >
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statEmoji}>
                      {moodTrend === "improving"
                        ? "📈"
                        : moodTrend === "declining"
                        ? "📉"
                        : "➡️"}
                    </Text>
                    <View style={styles.statIconGlow} />
                  </View>
                  <Text
                    style={[
                      styles.enhancedStatValue,
                      {
                        color:
                          moodTrend === "improving"
                            ? "#2D5A5A"
                            : moodTrend === "declining"
                            ? "#8B4513"
                            : "#6B5B95",
                        textTransform: "capitalize",
                      },
                    ]}
                  >
                    {moodTrend}
                  </Text>
                  <Text
                    style={[
                      styles.enhancedStatLabel,
                      {
                        color:
                          moodTrend === "improving"
                            ? "#3A6A6A"
                            : moodTrend === "declining"
                            ? "#A0522D"
                            : "#8B7BA8",
                      },
                    ]}
                  >
                    Mood Trend
                  </Text>
                  <View style={styles.trendIndicator}>
                    <View
                      style={[
                        styles.trendArrow,
                        {
                          backgroundColor:
                            moodTrend === "improving"
                              ? "#10b981"
                              : moodTrend === "declining"
                              ? "#ef4444"
                              : "#6b7280",
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.statSubtext,
                      {
                        color:
                          moodTrend === "improving"
                            ? "#3A6A6A"
                            : moodTrend === "declining"
                            ? "#A0522D"
                            : "#8B7BA8",
                      },
                    ]}
                  >
                    {moodTrend === "improving"
                      ? "Great progress!"
                      : moodTrend === "declining"
                      ? "Take care of yourself"
                      : "Steady as you go"}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Streak Days */}
            <Animated.View
              style={{
                opacity: statsAnimations[3],
                transform: [
                  { scale: statsAnimations[3] },
                  {
                    rotateY: statsAnimations[3].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["90deg", "0deg"],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                style={styles.statCard}
                activeOpacity={0.9}
                onPress={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }
              >
                <View
                  style={[
                    styles.enhancedStatCard,
                    { backgroundColor: streakDays > 7 ? "#ff9a9e" : "#ffecd2" },
                  ]}
                >
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statEmoji}>🔥</Text>
                    <View style={styles.statIconGlow} />
                  </View>
                  <Text
                    style={[
                      styles.enhancedStatValue,
                      { color: streakDays > 7 ? "#8B0066" : "#8B4513" },
                    ]}
                  >
                    {streakDays}
                  </Text>
                  <Text
                    style={[
                      styles.enhancedStatLabel,
                      { color: streakDays > 7 ? "#A0527D" : "#A0522D" },
                    ]}
                  >
                    Day Streak
                  </Text>
                  <View style={styles.streakVisualization}>
                    {Array.from({ length: Math.min(streakDays, 7) }).map(
                      (_, i) => (
                        <View key={i} style={styles.streakFlame} />
                      )
                    )}
                  </View>
                  <Text
                    style={[
                      styles.statSubtext,
                      { color: streakDays > 7 ? "#A0527D" : "#A0522D" },
                    ]}
                  >
                    {streakDays === 0
                      ? "Start your streak!"
                      : streakDays < 3
                      ? "Building momentum!"
                      : streakDays < 7
                      ? "Great consistency!"
                      : "Amazing dedication!"}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Mood Overview</Text>
            {moodData.length > 0 ? (
              <>
                <Text style={styles.moodText}>
                  Your most recent mood:{" "}
                  <Text style={{ color: moodColors[recentMood!] }}>
                    {recentMood}
                  </Text>
                </Text>
                {LineChartRef ? (
                  renderChart(LineChartRef)
                ) : (
                  <Text style={styles.chartErrorText}>
                    Loading chart module...
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.noDataText}>
                No mood data yet. Go to the Home screen to log your first mood!
              </Text>
            )}
          </GlassCard>

          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <Button
              title="Log Today's Mood & Goal"
              onPress={() => navigation.navigate("Home")}
              style={styles.actionButton}
            />
            <View style={{ height: spacing.lg }} />
            <Button
              title="Practice Mindfulness"
              onPress={() => navigation.navigate("Mindfulness")}
              variant="outline"
              style={styles.actionButton}
            />
          </GlassCard>
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Wearable Metrics</Text>
            {wearablesLoading && (
              <Text style={styles.moodText}>Loading wearable data...</Text>
            )}
            {!wearablesLoading && !wearableMetrics && (
              <Text style={styles.noDataText}>
                No wearable data. Connect a device or grant permissions.
              </Text>
            )}
            {!wearablesLoading && wearableMetrics && (
              <View style={styles.wearablesGrid}>
                {[
                  {
                    label: "Heart Rate",
                    value: wearableMetrics.heartRate
                      ? `${wearableMetrics.heartRate} bpm`
                      : "—",
                    color: "#667eea",
                    emoji: "❤️",
                  },
                  {
                    label: "Resting HR",
                    value: wearableMetrics.restingHeartRate
                      ? `${wearableMetrics.restingHeartRate} bpm`
                      : "—",
                    color: "#a8edea",
                    emoji: "😴",
                  },
                  {
                    label: "SpO2",
                    value: wearableMetrics.spo2
                      ? `${wearableMetrics.spo2}%`
                      : "—",
                    color: "#ffecd2",
                    emoji: "🫁",
                  },
                  {
                    label: "Steps",
                    value: wearableMetrics.stepsToday
                      ? `${wearableMetrics.stepsToday}`
                      : "—",
                    color: "#d299c2",
                    emoji: "👟",
                  },
                  {
                    label: "Active Min",
                    value: wearableMetrics.activeMinutesToday
                      ? `${wearableMetrics.activeMinutesToday}m`
                      : "—",
                    color: "#ff9a9e",
                    emoji: "🏃",
                  },
                  {
                    label: "Sleep",
                    value: wearableMetrics.sleepHoursLastNight
                      ? `${wearableMetrics.sleepHoursLastNight.toFixed(1)}h`
                      : "—",
                    color: "#a1c4fd",
                    emoji: "🛌",
                  },
                  {
                    label: "Calories",
                    value: wearableMetrics.caloriesBurnedToday
                      ? `${wearableMetrics.caloriesBurnedToday}`
                      : "—",
                    color: "#cfd9df",
                    emoji: "🔥",
                  },
                  {
                    label: "Readiness",
                    value: wearableMetrics.readinessScore
                      ? `${wearableMetrics.readinessScore}`
                      : "—",
                    color: "#f6d365",
                    emoji: "⚡",
                  },
                ].map((item) => (
                  <View key={item.label} style={styles.wearableCard}>
                    <View
                      style={[
                        styles.wearableInner,
                        { backgroundColor: item.color },
                      ]}
                    >
                      <Text style={styles.wearableEmoji}>{item.emoji}</Text>
                      <Text style={styles.wearableValue}>{item.value}</Text>
                      <Text style={styles.wearableLabel}>{item.label}</Text>
                    </View>
                  </View>
                ))}
                <Text style={styles.wearableSourceText}>
                  Source: {wearableMetrics.source || "demo"} • Updated{" "}
                  {new Date(wearableMetrics.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            )}
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              <Button
                title="Refresh Wearables"
                onPress={async () => {
                  setWearablesLoading(true);
                  const wm = await fetchWearableMetrics(true);
                  setWearableMetrics(wm);
                  setWearablesLoading(false);
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  );
                }}
                style={{ marginTop: spacing.md, flex: 1 }}
                variant="outline"
              />
              <Button
                title="Manage Devices"
                onPress={() =>
                  navigation.navigate("WearablePermissions" as any)
                }
                style={{ marginTop: spacing.md, flex: 1 }}
                variant="outline"
              />
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </MaterialBackground>
  );
};

export default DashboardScreen;
