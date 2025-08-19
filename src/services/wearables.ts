// Unified wearable integration layer.
// Provides provider registration, caching, permission orchestration and summary helpers.
// Native providers (HealthKit / Google Fit) & OAuth providers (Fitbit / Garmin).
import { fitbitProvider } from "./wearables/providers/fitbit";
import { garminProvider } from "./wearables/providers/garmin";
import { googleFitProvider } from "./wearables/providers/googleFit";
import { healthKitProvider } from "./wearables/providers/healthkit";

export interface WearableMetrics {
  heartRate?: number; // current bpm
  restingHeartRate?: number; // average resting bpm
  spo2?: number; // blood oxygen %
  stepsToday?: number; // steps today
  caloriesBurnedToday?: number; // kcal
  activeMinutesToday?: number; // minutes
  sleepHoursLastNight?: number; // hours
  readinessScore?: number; // generic recovery/readiness score if available
  source?: string; // which provider provided data
  timestamp: number; // unix ms
}

// Simulated fetch (replace with real integrations)
// Provider abstractions (stubs to be replaced by native bridges)
export interface WearableProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  fetchMetrics(): Promise<Partial<WearableMetrics> | null>;
}

// Attempt dynamic imports for native / oauth providers; fall back silently if not present.
// Static imports (tree-shaken if files empty) wrapped in try blocks not needed with TS/Metro; if a file is missing it would be a build error.
// Since the placeholder files exist, we import them directly.
const dynamicProviders: WearableProvider[] = [
  healthKitProvider,
  googleFitProvider,
  fitbitProvider,
  garminProvider,
];

const demoProvider: WearableProvider = {
  name: "demo",
  async isAvailable() {
    return true;
  },
  async requestPermissions() {
    return true;
  },
  async fetchMetrics() {
    const now = Date.now();
    return {
      heartRate: 72 + Math.round(Math.random() * 8 - 4),
      restingHeartRate: 60 + Math.round(Math.random() * 4 - 2),
      spo2: 96 + Math.round(Math.random() * 3),
      stepsToday: 4000 + Math.round(Math.random() * 3000),
      caloriesBurnedToday: 1200 + Math.round(Math.random() * 300),
      activeMinutesToday: 35 + Math.round(Math.random() * 25),
      sleepHoursLastNight: 6 + Math.random() * 2,
      readinessScore: 70 + Math.round(Math.random() * 25),
      source: "demo",
      timestamp: now,
    };
  },
};

const providers: WearableProvider[] = [...dynamicProviders, demoProvider];

let cachedMetrics: WearableMetrics | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

export const fetchWearableMetrics = async (
  forceRefresh = false
): Promise<WearableMetrics | null> => {
  if (
    !forceRefresh &&
    cachedMetrics &&
    Date.now() - cacheTimestamp < CACHE_TTL_MS
  ) {
    return cachedMetrics;
  }
  for (const p of providers) {
    try {
      if (await p.isAvailable()) {
        const perm = await p.requestPermissions();
        if (!perm) continue;
        const partial = await p.fetchMetrics();
        if (partial) {
          cachedMetrics = {
            ...(partial as WearableMetrics),
            source: p.name,
            timestamp: partial.timestamp || Date.now(),
          };
          cacheTimestamp = Date.now();
          return cachedMetrics;
        }
      }
    } catch {
      // ignore and continue
    }
  }
  // fallback demo
  const demo = await demoProvider.fetchMetrics();
  cachedMetrics = { ...(demo as WearableMetrics) } as WearableMetrics;
  cacheTimestamp = Date.now();
  return cachedMetrics;
};

// Explicit permission request across providers (excluding demo)
export const requestWearablePermissions = async (): Promise<{
  granted: string[];
  denied: string[];
}> => {
  const granted: string[] = [];
  const denied: string[] = [];
  for (const p of providers.filter((p) => p.name !== "demo")) {
    try {
      if (await p.isAvailable()) {
        const ok = await p.requestPermissions();
        if (ok) granted.push(p.name);
        else denied.push(p.name);
      }
    } catch {
      denied.push(p.name);
    }
  }
  return { granted, denied };
};

export const summarizeWearableContext = (m: WearableMetrics | null): string => {
  if (!m) return "No wearable metrics available.";
  const parts: string[] = [];
  if (m.heartRate) parts.push(`current heart rate ${m.heartRate} bpm`);
  if (m.restingHeartRate)
    parts.push(`resting heart rate ${m.restingHeartRate} bpm`);
  if (m.spo2) parts.push(`SpO2 ${m.spo2}%`);
  if (m.stepsToday) parts.push(`${m.stepsToday} steps so far today`);
  if (m.caloriesBurnedToday)
    parts.push(`${m.caloriesBurnedToday} kcal burned today`);
  if (m.activeMinutesToday)
    parts.push(`${m.activeMinutesToday} active minutes`);
  if (m.sleepHoursLastNight)
    parts.push(`${m.sleepHoursLastNight.toFixed(1)}h sleep last night`);
  if (m.readinessScore) parts.push(`readiness score ${m.readinessScore}`);
  return parts.join(", ");
};

export const getCachedWearableMetrics = () => cachedMetrics;
export const getActiveProviders = () => providers.map((p) => p.name);
