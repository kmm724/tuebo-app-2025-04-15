import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';

type FunFact = {
  id: string;
  emoji: string;
  fact: string;
  topic: string;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'FunFactsMain'>;

const funFacts: FunFact[] = [
  { id: '1', emoji: '🐝', fact: 'Bees communicate by dancing!', topic: 'bees' },
  { id: '2', emoji: '🦈', fact: 'Sharks have been around longer than dinosaurs!', topic: 'sharks' },
  { id: '3', emoji: '🧠', fact: 'Your brain uses more energy than any other organ!', topic: 'brain' },
  // Add more if needed
];

const FunFactsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = async (topic: string, fact: string) => {
    try {
      // Track recent topics
      const recent = await AsyncStorage.getItem('recentTopics');
      let recentList = recent ? JSON.parse(recent) : [];
      recentList.unshift(topic);
      recentList = [...new Set(recentList)].slice(0, 10);
      await AsyncStorage.setItem('recentTopics', JSON.stringify(recentList));

      // Track tap counts
      const counts = await AsyncStorage.getItem('funFactCounts');
      let countMap = counts ? JSON.parse(counts) : {};
      countMap[topic] = (countMap[topic] || 0) + 1;

      console.log(`🔢 Updated count for "${topic}": ${countMap[topic]}`);
      await AsyncStorage.setItem('funFactCounts', JSON.stringify(countMap));
    } catch (error) {
      console.error('❌ Failed to update tracking data:', error);
    }

    navigation.navigate('FactVideoScreen', { topic, fact });
  };

  const renderItem = ({ item }: { item: FunFact }) => (
    <View style={styles.factCard}>
      <TouchableOpacity onPress={() => handlePress(item.topic, item.fact)}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </TouchableOpacity>
      <Text style={styles.factText}>{item.fact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={funFacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 16,
  },
  factCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  factText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FunFactsScreen;
