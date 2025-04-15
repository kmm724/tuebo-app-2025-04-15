import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default function SearchResultsScreen({ route }) {
  const { results } = route.params || { results: [] };

  // ✅ Prevent crash by ensuring results is an array
  const validResults = Array.isArray(results)
    ? results.filter(item => item.link && typeof item.link === 'string')
    : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Results</Text>

      {validResults.length === 0 ? (
        <Text style={styles.empty}>No results found.</Text>
      ) : (
        validResults.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => Linking.openURL(item.link)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.snippet}>{item.snippet}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffef6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cce0ff',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1d3557',
    marginBottom: 4,
  },
  snippet: {
    fontSize: 14,
    color: '#444',
  },
});
