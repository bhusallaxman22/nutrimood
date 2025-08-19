import { StyleSheet } from 'react-native';
import {
  colors,
  dimensions,
  shadows,
  spacing,
  typography,
} from "../../theme/materialDesign";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md, // Reduced from spacing.lg
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    ...typography.h3,
    color: colors.onSurface,
  },
  errorText: {
    ...typography.body1,
    color: colors.error,
    textAlign: "center",
    padding: spacing.md, // Reduced from spacing.lg
  },
  header: {
    marginBottom: spacing.md, // Reduced from spacing.lg
  },
  greetingText: {
    ...typography.h1,
    color: colors.onSurface,
    fontWeight: "bold",
    fontSize: 24, // Reduced for better viewport
  },
  subtitleText: {
    ...typography.body1,
    color: colors.onSurfaceVariant,
  },
  card: {
    marginBottom: spacing.lg,
    padding: spacing.xl, // Increased for better content display
    minHeight: 200, // Increased for proper text display
  },
  // Analytics stat cards grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: "48%",
    minHeight: 140,
  },
  enhancedStatCard: {
    flex: 1,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    aspectRatio: 1,
    maxHeight: 170,
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
  statEmoji: {
    fontSize: 24,
    zIndex: 1,
  },
  enhancedStatValue: {
    ...typography.h3,
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
    width: "100%",
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1.5,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  statProgressFill: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 1.5,
  },
  statSubtext: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 9,
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
    marginBottom: spacing.xs,
    overflow: "hidden",
  },
  trendArrow: {
    width: "40%",
    height: "100%",
    borderRadius: 1,
  },
  streakVisualization: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 4,
    marginBottom: spacing.xs,
  },
  streakFlame: {
    width: 6,
    height: 10,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  cardTitle: {
    ...typography.h3,
    color: colors.onSurface,
    marginBottom: spacing.lg, // Increased for better spacing
    fontWeight: "700",
    fontSize: 22, // Increased for better readability
  },
  moodText: {
    ...typography.body1,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.md,
  },
  chart: {
    borderRadius: dimensions.borderRadius.large,
    ...shadows.medium,
  },
  chartErrorText: {
    ...typography.body2,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingVertical: spacing.xl,
  },
  noDataText: {
    ...typography.body1,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingVertical: spacing.xl,
  },
  actionButton: {
    paddingVertical: spacing.sm, // Reduced from spacing.md
    paddingHorizontal: spacing.md, // Reduced from spacing.lg
  },
  wearablesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.sm,
    columnGap: spacing.sm,
  },
  wearableCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: spacing.sm,
  },
  wearableInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.sm,
    borderRadius: 16,
  },
  wearableEmoji: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  wearableValue: {
    ...typography.h4,
    fontWeight: "700",
    color: "white",
    marginBottom: spacing.xs,
  },
  wearableLabel: {
    ...typography.caption,
    color: "rgba(255,255,255,0.9)",
    fontSize: 10,
    textAlign: "center",
  },
  wearableSourceText: {
    ...typography.caption,
    width: "100%",
    textAlign: "center",
    marginTop: spacing.sm,
    color: colors.onSurfaceVariant,
  },
});
