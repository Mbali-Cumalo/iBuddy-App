import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SelfCareScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  let mood = params.mood;

  // Ensure mood is a single string
  if (Array.isArray(mood)) {
    mood = mood[0];
  }

  const getTip = (mood: string | undefined) => {
    switch (mood) {
      case '😄': return "Keep riding the good vibes! Try a quick walk in the sun to maintain your positive energy.";
      case '😊': return "Do something kind for yourself today! You deserve it.";
      case '😐': return "Try a short meditation or write down 3 things you're grateful for to boost your mood.";
      case '😢': return "It's okay to feel this way. A warm bath and journaling may help process these emotions.";
      case '😡': return "Take 5 deep breaths. Consider a calming tea or some quiet time to reset.";
      default: return "Select your mood on the home screen to get personalized self-care tips!";
    }
  };

  const getColorForMood = (mood: string | undefined) => {
    switch (mood) {
      case '😄': return '#4CAF50'; // Green
      case '😊': return '#66BB6A'; // Light green
      case '😐': return '#FFC107'; // Amber
      case '😢': return '#42A5F5'; // Blue
      case '😡': return '#EF5350'; // Red
      default: return '#8E6BBF'; // Default purple
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.heading}>🧘 Self-Care Guide</Text>
        
        <View style={[
          styles.moodContainer,
          { backgroundColor: getColorForMood(mood) + '20' } // Add opacity
        ]}>
          <Text style={styles.moodLabel}>Your Current Mood:</Text>
          <Text style={styles.moodEmoji}>{mood || '?'}</Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>{getTip(mood)}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#BEA8CE', // Soft purple background
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E2635',
    marginBottom: 24,
    textAlign: 'center',
  },
  moodContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0E6FA',
  },
  moodLabel: {
    fontSize: 16,
    color: '#5E4B8B',
    marginBottom: 8,
  },
  moodEmoji: {
    fontSize: 48,
  },
  tipCard: {
    backgroundColor: '#FBFBFB',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8E6BBF',
    marginBottom: 32,
  },
  tipText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2E2635',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8E6BBF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});