import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

const funFacts = [
  { text: 'Octopuses have three hearts and blue blood!', emoji: '🐙' },
  { text: 'Bananas are berries, but strawberries are not!', emoji: '🍌' },
  { text: 'A day on Venus is longer than a year on Venus!', emoji: '🪐' },
  { text: 'Elephants can recognize themselves in mirrors!', emoji: '🐘' },
  { text: 'Honey never spoils — archaeologists found 3,000-year-old honey!', emoji: '🍯' },
  { text: 'A bolt of lightning is five times hotter than the sun.', emoji: '⚡' },
  { text: 'Sloths can hold their breath longer than dolphins can.', emoji: '🦥' },
  { text: 'Sharks existed before trees.', emoji: '🦈' },
  { text: 'Some turtles can breathe through their butts!', emoji: '🐢' },
  { text: 'There are more stars in space than grains of sand on Earth.', emoji: '🌌' },
  { text: 'Sea otters hold hands when they sleep so they don’t drift apart.', emoji: '🦦' },
  { text: 'The Eiffel Tower can grow over 6 inches during hot days.', emoji: '🗼' }
];

export default function FunFactsScreen() {
  const [fact, setFact] = useState(funFacts[0]);

  const [currentIndex, setCurrentIndex] = useState(0);

const getRandomFact = () => {
  const nextIndex = (currentIndex + 1) % funFacts.length;
  setCurrentIndex(nextIndex);
  const nextFact = funFacts[nextIndex];
  setFact(nextFact);
  Speech.speak(nextFact.text);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Did You Know?</Text>

      <Text style={styles.emoji}>{fact.emoji}</Text>
      <Text style={styles.fact}>{fact.text}</Text>

      <TouchableOpacity style={styles.button} onPress={getRandomFact}>
        <Text style={styles.buttonText}>✨ Surprise Me Again!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6e4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  fact: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#457b9d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
