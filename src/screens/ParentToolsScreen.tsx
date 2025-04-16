import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ParentToolsScreen() {
  const [pinInput, setPinInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [blockedKeyword, setBlockedKeyword] = useState('');
  const [blockedKeywords, setBlockedKeywords] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const navigation = useNavigation();

  const correctPin = '1234';

  useFocusEffect(
    useCallback(() => {
      if (unlocked) {
        loadBlockedKeywords();
        loadSearchHistory();
      }
    }, [unlocked])
  );

  const loadBlockedKeywords = async () => {
    try {
      const stored = await AsyncStorage.getItem('blockedKeywords');
      const parsed = stored ? JSON.parse(stored) : [];
      setBlockedKeywords(parsed);
    } catch (error) {
      console.error('Failed to load blocked keywords:', error);
    }
  };

  const saveBlockedKeyword = async () => {
    const trimmed = blockedKeyword.trim().toLowerCase();
    if (!trimmed || blockedKeywords.includes(trimmed)) return;

    const updated = [...blockedKeywords, trimmed];
    setBlockedKeywords(updated);
    setBlockedKeyword('');
    Keyboard.dismiss();

    try {
      await AsyncStorage.setItem('blockedKeywords', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save blocked keyword:', error);
    }
  };

  const handleRemoveBlockedKeyword = async (wordToRemove) => {
    const updated = blockedKeywords.filter(word => word !== wordToRemove);
    setBlockedKeywords(updated);
    try {
      await AsyncStorage.setItem('blockedKeywords', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to remove keyword:', error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('searchHistory');
      const parsed = stored ? JSON.parse(stored) : [];
      setSearchHistory(parsed);
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  const handleUnlock = () => {
    if (pinInput === correctPin) {
      setUnlocked(true);
      setPinInput('');
      Keyboard.dismiss();
    } else {
      alert('Incorrect PIN. Try again.');
    }
  };

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Enter PIN to Access Parent Tools</Text>
        <TextInput
          value={pinInput}
          onChangeText={setPinInput}
          placeholder="Enter PIN"
          secureTextEntry
          keyboardType="number-pad"
          style={styles.pinInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleUnlock}>
          <Text style={styles.buttonText}>🔓 Unlock</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
            <Text style={styles.label}>Add a Blocked Keyword:</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={blockedKeyword}
          onChangeText={setBlockedKeyword}
          placeholder="Enter word to block"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={saveBlockedKeyword}>
          <Text style={styles.buttonText}>💾 Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={() => navigation.navigate('ParentInsights')}
      >
        <Text style={styles.buttonText}>📊 View Insights</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setShowBlocked(!showBlocked)}>
        <Text style={styles.buttonText}>
          {showBlocked ? '▼' : '▶'} Blocked Keywords ({blockedKeywords.length})
        </Text>
      </TouchableOpacity>
      {showBlocked && (
        <FlatList
          data={blockedKeywords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.keywordRow}>
              <Text style={styles.keyword}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveBlockedKeyword(item)}>
                <Text style={styles.removeText}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => setShowHistory(!showHistory)}>
        <Text style={styles.buttonText}>
          {showHistory ? '▼' : '▶'} Search History ({searchHistory.length})
        </Text>
      </TouchableOpacity>
      {showHistory && (
        <>
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.keyword}>{item.term || item}</Text>
            )}
            ListEmptyComponent={<Text style={styles.text}>No search history found.</Text>}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 12 }]}
            onPress={clearSearchHistory}
          >
            <Text style={styles.buttonText}>🗑️ Clear Search History</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={{ marginTop: 30, alignSelf: 'flex-end' }}>
        <TouchableOpacity style={styles.button} onPress={() => setUnlocked(false)}>
          <Text style={styles.buttonText}>🔒 Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pinInput: {
    width: '60%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#457b9d',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  keyword: {
    fontSize: 16,
    backgroundColor: '#e0f0ff',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
    textAlign: 'center',
    flex: 1,
  },
  keywordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  removeText: {
    fontSize: 16,
    color: 'red',
    paddingHorizontal: 12,
  },
  toggleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d3557',
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#dfefff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
