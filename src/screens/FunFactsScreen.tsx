import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type FunFact = {
  id: string;
  emoji: string;
  fact: string;
  topic: string;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'FunFactsMain'>;

const funFacts: FunFact[] = [
  { id: '1', emoji: '🚀', fact: 'A rocket can travel at speeds over 17,000 mph!', topic: 'rockets' },
  { id: '2', emoji: '🐘', fact: 'Elephants can recognize themselves in a mirror!', topic: 'elephants' },
  { id: '3', emoji: '🌋', fact: 'Some volcanoes can shoot lava over 1,000 feet in the air!', topic: 'volcanoes' },
  { id: '4', emoji: '🦈', fact: 'Sharks have been around longer than dinosaurs!', topic: 'sharks' },
  { id: '5', emoji: '🧠', fact: 'Your brain uses more energy than any other organ!', topic: 'brain' },
  { id: '6', emoji: '🐝', fact: 'Bees communicate by dancing!', topic: 'bees' },
  { id: '7', emoji: '🦕', fact: 'Some dinosaurs had feathers!', topic: 'dinosaurs' },
  { id: '8', emoji: '🛰️', fact: 'Satellites orbit Earth at thousands of miles per hour!', topic: 'satellites' },
  { id: '9', emoji: '🧊', fact: 'Antarctica is the driest, coldest, and windiest place on Earth!', topic: 'antarctica' },
  { id: '10', emoji: '🌌', fact: 'The Milky Way galaxy is over 100,000 light-years wide!', topic: 'milky way' },
  { id: '11', emoji: '🦉', fact: 'Owls can rotate their heads up to 270 degrees!', topic: 'owls' },
  { id: '12', emoji: '🌱', fact: 'Plants can "talk" to each other using chemicals!', topic: 'plants' },
  { id: '13', emoji: '🐙', fact: 'An octopus has three hearts and blue blood!', topic: 'octopus' },
  { id: '14', emoji: '🚂', fact: 'Trains once ran on steam from burning coal or wood!', topic: 'trains' },
  { id: '15', emoji: '🦋', fact: 'Butterflies taste with their feet!', topic: 'butterflies' },
  { id: '16', emoji: '🐧', fact: 'Penguins can drink salty seawater!', topic: 'penguins' },
  { id: '17', emoji: '⚡', fact: 'Lightning is five times hotter than the surface of the sun!', topic: 'lightning' },
  { id: '18', emoji: '🐢', fact: 'Some turtles can live over 100 years!', topic: 'turtles' },
  { id: '19', emoji: '🧪', fact: 'Slime is a non-Newtonian fluid—it’s both liquid and solid!', topic: 'slime' },
  { id: '20', emoji: '🎈', fact: 'The first hot air balloon flight carried a duck, a sheep, and a rooster!', topic: 'hot air balloons' },
];

const FunFactsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = (topic: string, fact: string) => {
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
