import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

import Button from '../../components/atoms/Button';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { auth, db } from '../../services/firebase';
import { TabNavigatorParamList } from '../../navigation/types';
import { spacing } from '../../theme/materialDesign';

import { MoodData } from './types';
import {
    moodColors,
    getGreeting,
    generateChartData,
    getChartConfig,
    getUserDisplayName
} from './utils';
import { styles } from './styles';

// Try to import chart, but provide fallback
let LineChart: any;
try {
    const chartKit = require('react-native-chart-kit');
    LineChart = chartKit.LineChart;
} catch (error) {
    console.log('Chart library not available:', error);
    LineChart = null;
}

type DashboardScreenNavigationProp = BottomTabNavigationProp<TabNavigatorParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const [moodData, setMoodData] = useState<MoodData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [recentMood, setRecentMood] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setUserName(getUserDisplayName(user));

                    const q = query(
                        collection(db, 'moods'),
                        where('userId', '==', user.uid),
                        orderBy('timestamp', 'desc')
                    );
                    const querySnapshot = await getDocs(q);
                    const data: MoodData[] = querySnapshot.docs.map(doc => doc.data() as MoodData);
                    setMoodData(data);

                    if (data.length > 0) {
                        setRecentMood(data[0].mood);
                    }
                }
            } catch (err) {
                setError('Failed to fetch mood data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const renderChart = () => {
        if (!LineChart) {
            return <Text style={styles.chartErrorText}>Chart library not available. Please install react-native-chart-kit.</Text>;
        }
        if (moodData.length < 2) {
            return <Text style={styles.chartErrorText}>Not enough data to display a chart. Log your mood for a few days!</Text>;
        }

        const chartData = generateChartData(moodData);
        const chartConfig = getChartConfig();

        return (
            <LineChart
                data={chartData}
                width={Dimensions.get('window').width - spacing.lg * 2}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
            />
        );
    };

    if (loading) {
        return (
            <GlassBackground>
                <View style={styles.centered}>
                    <Text style={styles.loadingText}>Loading Dashboard...</Text>
                </View>
            </GlassBackground>
        );
    }

    if (error) {
        return (
            <GlassBackground>
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </GlassBackground>
        );
    }

    return (
        <GlassBackground>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xxxl + 20 }}>
                    <View style={styles.header}>
                        <Text style={styles.greetingText}>{getGreeting()}, {userName}</Text>
                        <Text style={styles.subtitleText}>Here's your wellness snapshot</Text>
                    </View>

                    <GlassCard style={styles.card}>
                        <Text style={styles.cardTitle}>Mood Overview</Text>
                        {moodData.length > 0 ? (
                            <>
                                <Text style={styles.moodText}>
                                    Your most recent mood: <Text style={{ color: moodColors[recentMood!] }}>{recentMood}</Text>
                                </Text>
                                {renderChart()}
                            </>
                        ) : (
                            <Text style={styles.noDataText}>No mood data yet. Go to the Home screen to log your first mood!</Text>
                        )}
                    </GlassCard>

                    <GlassCard style={styles.card}>
                        <Text style={styles.cardTitle}>Quick Actions</Text>
                        <Button
                            title="Log Today's Mood & Goal"
                            onPress={() => navigation.navigate('Home')}
                            style={styles.actionButton}
                        />
                        <View style={{ height: spacing.lg }} />
                        <Button
                            title="Practice Mindfulness"
                            onPress={() => navigation.navigate('Mindfulness')}
                            variant="outline"
                            style={styles.actionButton}
                        />
                    </GlassCard>
                </ScrollView>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default DashboardScreen;
