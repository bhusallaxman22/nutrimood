import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme/materialDesign";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacing.md,
    paddingBottom: spacing.xxl * 2,
  },
  // Floating Background Elements
  floatingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  floatingMood: {
    position: "absolute",
    top: "30%",
  },
  floatingMoodEmoji: {
    fontSize: 20,
    opacity: 0.4,
  },
  // Enhanced Header
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    alignItems: "center",
    zIndex: 1,
  },
  titleText: {
    ...typography.h2,
    color: colors.onSurface,
    textAlign: "center",
    fontWeight: "700",
  },
  subtitleText: {
    ...typography.body2,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  insightButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 16,
    marginTop: spacing.sm,
  },
  insightButtonText: {
    ...typography.caption,
    color: "white",
    fontWeight: "600",
  },
  // Time Range Selector
  timeRangeContainer: {
    marginBottom: spacing.md,
    zIndex: 1,
  },
  timeRangeTitle: {
    ...typography.body1,
    color: colors.onSurface,
    fontWeight: "600",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  timeRangeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  timeRangeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeRangeButtonText: {
    ...typography.caption,
    color: colors.onSurface,
    fontWeight: "600",
  },
  timeRangeButtonTextActive: {
    color: "white",
  },
  swipeHint: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 10,
  },
  // Insights Card
  insightsCard: {
    marginBottom: spacing.md,
  },
  insightsCardInner: {
    padding: spacing.md,
  },
  insightText: {
    ...typography.body2,
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  insightTap: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 10,
  },
  // Enhanced Loading
  loadingCard: {
    marginBottom: spacing.md,
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  loadingEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  loadingText: {
    ...typography.body2,
    color: colors.onSurfaceVariant,
    fontStyle: "italic",
    marginBottom: spacing.xs,
  },
  loadingSubtext: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  // Enhanced Statistics Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  horizontalStatsContainer: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    width: 190,
    minHeight: 230,
    maxHeight: 260,
    marginRight: spacing.lg,
  },
  statCardInner: {
    alignItems: "center",
    padding: spacing.lg,
    justifyContent: "center",
    flex: 1,
  },
  // Enhanced Stat Card Styles
  enhancedStatCard: {
    flex: 1,
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    // Remove fixed aspect ratio to allow content to size naturally
    maxHeight: 260,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  statEmoji: {
    fontSize: 30,
    marginBottom: spacing.sm,
  },
  statIconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  statIconGlow: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
  },
  enhancedStatValue: {
    ...typography.h2,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.xs,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  enhancedStatLabel: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  statProgressBar: {
    width: "90%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: spacing.sm,
  },
  statProgressFill: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 1.5,
  },
  statSubtext: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  moodIndicatorDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  moodDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  trendIndicator: {
    width: "100%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  trendArrow: {
    width: "70%",
    height: "100%",
    borderRadius: 1,
  },
  streakVisualization: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  streakFlame: {
    width: 6,
    height: 14,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 3,
  },
  // (Old statEmoji removed, new definition below with larger size)
  statValue: {
    ...typography.h3,
    color: colors.onSurface,
    fontWeight: "700",
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  statLabel: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    fontWeight: "500",
  },
  // Enhanced Frequent Mood Card
  frequentMoodCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  frequentMoodDisplay: {
    alignItems: "center",
  },
  frequentMoodGradient: {
    borderRadius: 40,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  frequentMoodEmoji: {
    fontSize: 36,
    marginBottom: spacing.xs,
  },
  frequentMoodText: {
    ...typography.body1,
    color: colors.onSurface,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  frequentMoodCount: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontWeight: "500",
  },
  // Enhanced Chart Card
  chartCard: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    minHeight: 220,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  chartModeButton: {
    padding: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
  },
  chartModeText: {
    fontSize: 16,
  },
  cardTitle: {
    ...typography.body1,
    color: colors.onSurface,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 12,
  },
  // Enhanced Chart Components
  animatedChart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 160,
    paddingVertical: spacing.sm,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
  },
  chartBar: {
    width: 16,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  chartBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: spacing.xs,
  },
  // Interactive Mood Breakdown
  breakdownCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  moodBreakdown: {
    gap: spacing.sm,
  },
  moodBreakdownItem: {
    borderRadius: 10,
    overflow: "hidden",
  },
  moodBreakdownItemSelected: {
    transform: [{ scale: 1.02 }],
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  moodBreakdownGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
  },
  moodBreakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  moodBreakdownEmoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  moodBreakdownMood: {
    ...typography.body2,
    color: "white",
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  moodBreakdownPercentage: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  moodBreakdownCount: {
    ...typography.body1,
    color: "white",
    fontWeight: "700",
  },
  // Enhanced Recent Moods
  recentCard: {
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  interactionCounter: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "600",
  },
  recentMoods: {
    gap: spacing.sm,
  },
  recentMoodItem: {
    borderRadius: 10,
    overflow: "hidden",
  },
  recentMoodGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
  },
  recentMoodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recentMoodEmoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  recentMoodText: {
    ...typography.body2,
    color: "white",
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  recentGoalText: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.8)",
  },
  recentMoodRight: {
    alignItems: "flex-end",
  },
  recentMoodDate: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: spacing.xs,
  },
  moodScoreIndicator: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
  },
  moodScoreText: {
    ...typography.caption,
    color: "white",
    fontWeight: "700",
  },
  // Chart Fallback Styles
  noDataContainer: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  noDataText: {
    ...typography.body2,
    color: colors.onSurfaceVariant,
    fontStyle: "italic",
    marginBottom: spacing.xs,
  },
  noDataSubtext: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  simpleChart: {
    padding: spacing.sm,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  chartLabel: {
    ...typography.caption,
    color: colors.onSurface,
    width: 50,
    textAlign: "right",
    marginRight: spacing.xs,
  },
  chartBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  chartValue: {
    ...typography.caption,
    color: colors.onSurface,
    width: 16,
  },
});
