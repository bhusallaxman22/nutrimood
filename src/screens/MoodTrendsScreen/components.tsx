import React from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './styles';
import { moodColors } from './utils';
import type { EnhancedChartProps, SimpleChartProps } from './types';

export const EnhancedChart: React.FC<EnhancedChartProps> = ({ data, mode, animations }) => {
    if (!data || !data.datasets || data.datasets[0].data.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No chart data available</Text>
                <Text style={styles.noDataSubtext}>Start tracking your mood to see trends!</Text>
            </View>
        );
    }

    const maxValue = Math.max(...data.datasets[0].data);
    const minValue = Math.min(...data.datasets[0].data);

    if (mode === 'bar') {
        return (
            <View style={styles.animatedChart}>
                {data.labels.map((label: string, index: number) => {
                    const value = data.datasets[0].data[index];
                    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
                    const moodColor = Object.values(moodColors)[value - 1] || '#6366f1';

                    return (
                        <View key={index} style={styles.chartColumn}>
                            <Animated.View
                                style={[
                                    styles.chartBar,
                                    {
                                        height: animations[index].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, percentage * 2],
                                        }),
                                        backgroundColor: moodColor,
                                    },
                                ]}
                            />
                            <Text style={styles.chartLabel}>{label}</Text>
                            <Text style={styles.chartValue}>{value}</Text>
                        </View>
                    );
                })}
            </View>
        );
    }

    return (
        <View style={styles.simpleChart}>
            {data.labels.map((label: string, index: number) => {
                const value = data.datasets[0].data[index];
                const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
                const moodColor = Object.values(moodColors)[value - 1] || '#6366f1';

                return (
                    <View key={index} style={styles.chartRow}>
                        <Text style={styles.chartLabel}>{label}</Text>
                        <View style={styles.chartBarContainer}>
                            <Animated.View
                                style={[
                                    styles.chartBarFill,
                                    {
                                        width: animations[index].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', `${percentage}%`],
                                        }),
                                        backgroundColor: moodColor,
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.chartValue}>{value}</Text>
                    </View>
                );
            })}
        </View>
    );
};

export const SimpleChart: React.FC<SimpleChartProps> = ({ data }) => {
    if (!data || !data.datasets || data.datasets[0].data.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No chart data available</Text>
            </View>
        );
    }

    const maxValue = Math.max(...data.datasets[0].data);

    return (
        <View style={styles.simpleChart}>
            {data.labels.map((label: string, index: number) => {
                const value = data.datasets[0].data[index];
                const percentage = (value / maxValue) * 100;

                return (
                    <View key={index} style={styles.chartRow}>
                        <Text style={styles.chartLabel}>{label}</Text>
                        <View style={styles.chartBar}>
                            <View
                                style={[
                                    styles.chartBarFill,
                                    { width: `${percentage}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.chartValue}>{value}</Text>
                    </View>
                );
            })}
        </View>
    );
};
