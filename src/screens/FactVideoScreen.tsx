import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../../types/navigation';

type FactVideoScreenRouteProp = RouteProp<RootStackParamList, 'FactVideoScreen'>;

const FactVideoScreen: React.FC = () => {
  const route = useRoute<FactVideoScreenRouteProp>();
  const { topic, fact } = route.params;

  useEffect(() => {
    Speech.speak(fact, {
      rate: 0.9,
      pitch: 1.2,
    });
  }, [fact]);

  // Map of topic keywords to YouTube video URLs
  const videoMap: Record<string, string> = {
    rockets: 'https://www.youtube.com/embed/1zOir5UnHhU',
    elephants: 'https://www.youtube.com/embed/9RcUqN1zCwE',
    volcanoes: 'https://www.youtube.com/embed/lAmqsMQG3RM',
    sharks: 'https://www.youtube.com/embed/N4WjRrmyr4k',
    brain: 'https://www.youtube.com/embed/XSzsI5aGcK4',
    bees: 'https://www.youtube.com/embed/tj0mImx8d0A',
    dinosaurs: 'https://www.youtube.com/embed/BWceRgkA5mA',
    satellites: 'https://www.youtube.com/embed/Kwxl9oGq0jI',
    antarctica: 'https://www.youtube.com/embed/YjD7H9xx5oQ',
    'milky way': 'https://www.youtube.com/embed/7mQ0FbcGvUo',
    owls: 'https://www.youtube.com/embed/4lRAaFGTXB4',
    plants: 'https://www.youtube.com/embed/dUBIQ1fTRzI',
    octopus: 'https://www.youtube.com/embed/E3CWDz8Z40s',
    trains: 'https://www.youtube.com/embed/dns1QbN3zZk',
    butterflies: 'https://www.youtube.com/embed/0qfYBCZNYKs',
    penguins: 'https://www.youtube.com/embed/1iYTzuh3ZzQ',
    lightning: 'https://www.youtube.com/embed/3rT1w8ZpUtY',
    turtles: 'https://www.youtube.com/embed/lBZkL3yTfFM',
    slime: 'https://www.youtube.com/embed/MoD2cwWlIjo',
    'hot air balloons': 'https://www.youtube.com/embed/0tKfZcePqYQ',
  };

  const videoUrl = videoMap[topic.toLowerCase()];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You clicked on:</Text>
      <Text style={styles.topic}>{topic}</Text>
      <Text style={styles.fact}>{fact}</Text>

      {videoUrl ? (
        <View style={styles.videoContainer}>
          <WebView
            style={styles.webview}
            source={{ uri: videoUrl }}
            allowsInlineMediaPlayback
          />
        </View>
      ) : (
        <Text style={styles.noVideo}>No video available for this topic.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  topic: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  fact: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  noVideo: {
    marginTop: 16,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default FactVideoScreen;
