import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParentInsightsScreen() {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('searchHistory');
      const parsed = stored ? JSON.parse(stored) : [];
      setSearchHistory(parsed);
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Parent Insights</Text>

      <Text style={styles.sectionTitle}>Recent Searches:</Text>
      <FlatList
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>🔎 {item.term || item}</Text>
        )}
        ListEmptyComponent={<Text style={styles.item}>No searches found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
    padding: 24,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1d3557',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 6,
  },
});
