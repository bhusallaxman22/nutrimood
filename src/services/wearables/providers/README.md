# Wearable Providers

This directory will contain platform or vendor specific provider implementations for wearable / health data.

## Planned Providers

- `healthkit.ts`: Apple HealthKit bridge (iOS)
- `googleFit.ts`: Google Fit bridge (Android)
- `fitbit.ts`: Fitbit Web API (OAuth 2.0)
- `garmin.ts`: Garmin Health API (OAuth 1.0a / 2.0 hybrid depending on program)

Each provider should export an object matching the `WearableProvider` interface:

```ts
export interface WearableProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  fetchMetrics(): Promise<Partial<WearableMetrics> | null>;
}
```

Keep implementations minimal and perform any complex mapping / normalization in a shared util if needed.
