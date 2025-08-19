// Background refresh service for wearable metrics
import { AppState, AppStateStatus } from "react-native";
import { fetchWearableMetrics } from "../wearables";

class WearableBackgroundService {
  private appStateSubscription: any = null;
  private refreshInterval: number | null = null;
  private isInitialized = false;

  // Configuration
  private readonly REFRESH_INTERVAL_MS = 1000 * 60 * 15; // 15 minutes
  private readonly FOCUS_REFRESH_DELAY_MS = 1000 * 2; // 2 seconds after app focus

  initialize() {
    if (this.isInitialized) return;

    // Listen for app state changes
    this.appStateSubscription = AppState.addEventListener(
      "change",
      this.handleAppStateChange
    );

    // Start periodic refresh
    this.startPeriodicRefresh();

    this.isInitialized = true;
    console.log("WearableBackgroundService initialized");
  }

  cleanup() {
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
      this.appStateSubscription = null;
    }

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }

    this.isInitialized = false;
    console.log("WearableBackgroundService cleaned up");
  }

  private handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      // App became active - refresh after a short delay
      setTimeout(() => {
        this.refreshMetrics("app_focus");
      }, this.FOCUS_REFRESH_DELAY_MS);
    }
  };

  private startPeriodicRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = setInterval(() => {
      this.refreshMetrics("periodic");
    }, this.REFRESH_INTERVAL_MS);
  }

  private async refreshMetrics(source: "app_focus" | "periodic" | "manual") {
    try {
      console.log(`Refreshing wearable metrics (${source})`);
      await fetchWearableMetrics(true); // Force refresh
      console.log(`Wearable metrics refreshed successfully (${source})`);
    } catch (error) {
      console.error(`Failed to refresh wearable metrics (${source}):`, error);
    }
  }

  // Manual refresh method for UI components
  async manualRefresh(): Promise<void> {
    return this.refreshMetrics("manual");
  }

  // Update refresh interval (in minutes)
  setRefreshInterval(minutes: number) {
    if (minutes < 1) {
      console.warn("Refresh interval must be at least 1 minute");
      return;
    }

    const newInterval = minutes * 60 * 1000;
    if (newInterval !== this.REFRESH_INTERVAL_MS) {
      console.log(`Updating refresh interval to ${minutes} minutes`);
      this.startPeriodicRefresh();
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasActiveRefresh: this.refreshInterval !== null,
      refreshIntervalMinutes: this.REFRESH_INTERVAL_MS / (1000 * 60),
    };
  }
}

// Singleton instance
export const wearableBackgroundService = new WearableBackgroundService();
