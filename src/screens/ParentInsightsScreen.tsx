import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ParentInsightsScreen: React.FC = () => {
  // Dummy data for now — we’ll make this dynamic soon
  const recentTopics = ['volcanoes', 'sharks', 'dinosaurs'];
  const mostPlayed = 'penguins';
  const timeSpentToday = 18; // in minutes

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Parent Insights</Text>

      <View style={styles.card}>
        <Text style={styles.title}>🕵️‍♀️ Recent Topics Explored</Text>
        {recentTopics.map((topic, index) => (
          <Text key={index} style={styles.detail}>• {topic}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>💬 Most Played Fun Fact</Text>
        <Text style={styles.detail}>{mostPlayed}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>⏱ Time Spent Today</Text>
        <Text style={styles.detail}>{timeSpentToday} minutes</Text>
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
