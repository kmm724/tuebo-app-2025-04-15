import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParentInsightsScreen: React.FC = () => {
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const [mostPlayed, setMostPlayed] = useState<string | null>(null);
  const [timeSpentToday, setTimeSpentToday] = useState<number>(0);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        const storedTopics = await AsyncStorage.getItem('recentTopics');
        if (storedTopics) {
          setRecentTopics(JSON.parse(storedTopics));
        }

        const storedCounts = await AsyncStorage.getItem('funFactCounts');
        if (storedCounts) {
          const counts = JSON.parse(storedCounts);
          const sortedTopics = Object.entries(counts)
            .sort((a, b) => b[1] - a[1]);

          if (sortedTopics.length > 0) {
            setMostPlayed(sortedTopics[0][0]);
          }
        }

        const timeKey = `timeSpent-${today}`;
        const storedTime = await AsyncStorage.getItem(timeKey);
        const parsedTime = storedTime ? parseInt(storedTime, 10) : 0;
        setTimeSpentToday(parsedTime);

      } catch (error) {
        console.error('Failed to load insights:', error);
      }
    };

    loadInsights();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Parent Insights</Text>

      <View style={styles.card}>
        <Text style={styles.title}>🕵️‍♀️ Recent Topics Explored</Text>
        {recentTopics.length > 0 ? (
          recentTopics.map((topic, index) => (
            <Text key={index} style={styles.detail}>• {topic}</Text>
          ))
        ) : (
          <Text style={styles.detail}>No activity tracked yet.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>💬 Most Played Fun Fact</Text>
        <Text style={styles.detail}>
          {mostPlayed ? mostPlayed : 'No data yet'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>⏱ Time Spent Today</Text>
        <Text style={styles.detail}>
          {timeSpentToday} minute{timeSpentToday === 1 ? '' : 's'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefefe',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1d3557',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ParentInsightsScreen;
