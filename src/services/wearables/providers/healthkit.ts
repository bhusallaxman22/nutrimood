// HealthKit provider implementation using react-native-health
import { Platform } from "react-native";
import type { WearableMetrics } from "../../wearables";

// Dynamic import to avoid crashes on Android - use conditional import
let HealthKit: any = null;
if (Platform.OS === "ios") {
  try {
    // Import only on iOS to prevent Metro bundling issues
    HealthKit = require("react-native-health"); // eslint-disable-line @typescript-eslint/no-require-imports
  } catch {
    // Module not available - keep HealthKit as null
  }
}

const HEALTHKIT_PERMISSIONS = {
  permissions: {
    read: [
      "HeartRate",
      "RestingHeartRate",
      "OxygenSaturation",
      "Steps",
      "ActiveEnergyBurned",
      "SleepAnalysis",
    ],
    write: [],
  },
};

export const healthKitProvider = {
  name: "apple_health",
  async isAvailable() {
    return Platform.OS === "ios" && HealthKit !== null;
  },
  async requestPermissions() {
    if (!HealthKit) return false;
    try {
      await HealthKit.initHealthKit(HEALTHKIT_PERMISSIONS);
      return true;
    } catch (error) {
      console.error("HealthKit permission error:", error);
      return false;
    }
  },
  async fetchMetrics(): Promise<Partial<WearableMetrics> | null> {
    if (!HealthKit) return null;

    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const [heartRate, restingHR, spo2, steps, activeEnergy, sleep] =
        await Promise.allSettled([
          // Latest heart rate
          HealthKit.getSamples({
            type: "HeartRate",
            startDate: yesterday.toISOString(),
            endDate: now.toISOString(),
            limit: 1,
            ascending: false,
          }),
          // Latest resting heart rate
          HealthKit.getSamples({
            type: "RestingHeartRate",
            startDate: yesterday.toISOString(),
            endDate: now.toISOString(),
            limit: 1,
            ascending: false,
          }),
          // Latest SpO2
          HealthKit.getSamples({
            type: "OxygenSaturation",
            startDate: yesterday.toISOString(),
            endDate: now.toISOString(),
            limit: 1,
            ascending: false,
          }),
          // Steps today
          HealthKit.getStatisticForToday({
            type: "Steps",
            startDate: startOfToday.toISOString(),
          }),
          // Active energy today
          HealthKit.getStatisticForToday({
            type: "ActiveEnergyBurned",
            startDate: startOfToday.toISOString(),
          }),
          // Sleep last night
          HealthKit.getSamples({
            type: "SleepAnalysis",
            startDate: new Date(
              yesterday.getTime() + 18 * 60 * 60 * 1000
            ).toISOString(), // 6pm yesterday
            endDate: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(), // 6am today
          }),
        ]);

      const metrics: Partial<WearableMetrics> = {
        timestamp: Date.now(),
      };

      // Process heart rate
      if (heartRate.status === "fulfilled" && heartRate.value?.length > 0) {
        metrics.heartRate = Math.round(heartRate.value[0].value);
      }

      // Process resting heart rate
      if (restingHR.status === "fulfilled" && restingHR.value?.length > 0) {
        metrics.restingHeartRate = Math.round(restingHR.value[0].value);
      }

      // Process SpO2
      if (spo2.status === "fulfilled" && spo2.value?.length > 0) {
        metrics.spo2 = Math.round(spo2.value[0].value * 100); // Convert to percentage
      }

      // Process steps
      if (steps.status === "fulfilled" && steps.value?.value) {
        metrics.stepsToday = Math.round(steps.value.value);
      }

      // Process active energy
      if (activeEnergy.status === "fulfilled" && activeEnergy.value?.value) {
        metrics.caloriesBurnedToday = Math.round(activeEnergy.value.value);
      }

      // Process sleep - calculate total sleep duration
      if (sleep.status === "fulfilled" && sleep.value?.length > 0) {
        const sleepSamples = sleep.value.filter(
          (s: any) => s.value === "InBed" || s.value === "Asleep"
        );
        if (sleepSamples.length > 0) {
          const totalSleepMs = sleepSamples.reduce(
            (total: number, sample: any) => {
              const start = new Date(sample.startDate).getTime();
              const end = new Date(sample.endDate).getTime();
              return total + (end - start);
            },
            0
          );
          metrics.sleepHoursLastNight = totalSleepMs / (1000 * 60 * 60); // Convert to hours
        }
      }

      return Object.keys(metrics).length > 1 ? metrics : null; // Return null if only timestamp
    } catch (error) {
      console.error("HealthKit fetch error:", error);
      return null;
    }
  },
};
