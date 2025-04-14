import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'AIzaSyB84VMq1SlOqk2Ul3hL8jjtXW5nR54cRXo';
const SEARCH_ENGINE_ID = 'f73c36ac849f74759';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const blocked = await AsyncStorage.getItem('blockedTerms');
      const blockedTerms = blocked ? JSON.parse(blocked) : [];
      const loweredQuery = searchQuery.toLowerCase();
      const isBlocked = blockedTerms.some(term => loweredQuery.includes(term));

      if (isBlocked) {
        Alert.alert('Blocked Search', 'This search contains a blocked keyword.');
        return;
      }

      const existing = await AsyncStorage.getItem('searchHistory');
      const parsed = existing ? JSON.parse(existing) : [];
      const newHistory = [{ term: searchQuery }, ...parsed].slice(0, 10);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));

      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchQuery)}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const formattedResults = data.items?.map((item) => ({
        title: item.title,
        snippet: item.snippet,
        thumbnail:
          item.pagemap?.cse_image?.[0]?.src || 'https://via.placeholder.com/64',
      })) || [];

      setResults(formattedResults);
      navigation.navigate('SearchResults', { results: formattedResults });
      setSearchQuery('');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      Keyboard.dismiss();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Image
        source={require('../../assets/mascot-search.png')}
        style={styles.mascot}
        resizeMode="contain"
      />

      <Text style={styles.header}>Welcome to TUEBO! 🧠✨</Text>
      <Text style={styles.subheader}>Safe Learning Search for Kids</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Type a question..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE6',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
  },
  mascot: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
