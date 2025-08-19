import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme/materialDesign";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: spacing.sm,
  },
  backButtonText: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: "600",
  },
  title: {
    ...typography.h1,
    color: colors.onSurface,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  card: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.onSurface,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  noProvidersText: {
    ...typography.body1,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: spacing.lg,
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  providerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  providerEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    ...typography.h4,
    color: colors.onSurface,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  providerDescription: {
    ...typography.body2,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  providerStatus: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
  privacyText: {
    ...typography.body2,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
});
