import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParentToolsScreen() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [history, setHistory] = useState([]);
  const [blockedTerms, setBlockedTerms] = useState([]);
  const [newBlockedTerm, setNewBlockedTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const correctPin = '1234';

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setTimeout(() => {
        setIsAuthenticated(true);
        loadSearchHistory();
        loadBlockedTerms();
      }, 500);
    } else {
      Alert.alert('Incorrect PIN', 'Please try again.');
      setPin('');
    }
  };

  const loadSearchHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('searchHistory');
      if (data) {
        const parsed = JSON.parse(data);
        const termsOnly = parsed.map((item) => item.term);
        setHistory(termsOnly);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const loadBlockedTerms = async () => {
    try {
      const data = await AsyncStorage.getItem('blockedTerms');
      if (data) {
        setBlockedTerms(JSON.parse(data));
      } else {
        setBlockedTerms([]);
      }
    } catch (error) {
      console.error('Failed to load blocked terms:', error);
    }
  };

  const saveBlockedTerms = async (updatedTerms) => {
    try {
      await AsyncStorage.setItem('blockedTerms', JSON.stringify(updatedTerms));
    } catch (error) {
      console.error('Failed to save blocked terms:', error);
    }
  };

  const addBlockedTerm = () => {
    if (newBlockedTerm.trim() && !blockedTerms.includes(newBlockedTerm.trim().toLowerCase())) {
      const updatedTerms = [...blockedTerms, newBlockedTerm.trim().toLowerCase()];
      setBlockedTerms(updatedTerms);
      saveBlockedTerms(updatedTerms);
      setNewBlockedTerm('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    setHistory([]);
    setBlockedTerms([]);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🔒 Enter Parent PIN</Text>
        <TextInput
          style={styles.pinInput}
          value={pin}
          onChangeText={setPin}
          placeholder="Enter PIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
        />
        <Button title="Unlock" onPress={handlePinSubmit} color="#ff8800" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👨‍👩‍👧 Parent Tools</Text>

      <TouchableOpacity onPress={() => setShowHistory(!showHistory)}>
        <Text style={styles.subHeader}>📜 Search History {showHistory ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showHistory && (
        history.length === 0 ? (
          <Text style={styles.empty}>No search history available.</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>🔎 {item}</Text>
              </View>
            )}
          />
        )
      )}

      <TouchableOpacity onPress={() => setShowBlocked(!showBlocked)}>
        <Text style={styles.subHeader}>⛔ Blocked Keywords {showBlocked ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showBlocked && (
        <>
          <View style={styles.blockedInputRow}>
            <TextInput
              style={styles.input}
              value={newBlockedTerm}
              onChangeText={setNewBlockedTerm}
              placeholder="Add keyword to block"
            />
            <Button title="Add" onPress={addBlockedTerm} color="#e63946" />
          </View>
          {blockedTerms.length > 0 && (
            <FlatList
              data={blockedTerms}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Text style={styles.historyText}>❌ {item}</Text>
                </View>
              )}
            />
          )}
        </>
      )}

      <View style={styles.logoutButtonWrapper}>
        <Button title="🔒 Log Out" onPress={handleLogout} color="#1d3557" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1faee',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1d3557',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#457b9d',
    marginVertical: 10,
    textAlign: 'center',
  },
  pinInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
    flex: 1,
  },
  historyItem: {
    backgroundColor: '#a8dadc',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  historyText: {
    fontSize: 16,
    color: '#1d3557',
  },
  empty: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  blockedInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutButtonWrapper: {
    marginTop: 20,
  },
});
