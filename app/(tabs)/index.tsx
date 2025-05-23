import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome to MindTrack</Text>
        <Text style={styles.subtitle}>
          A safe space to express yourself, track your mood, and receive personalized wellness tips.
        </Text>

        <View style={styles.moodBox}>
          <Text style={styles.label}>Log Mood</Text>
          <TextInput style={styles.input} placeholder="How are you feeling?" />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonBlue}>
            <Text style={styles.buttonText}>😊 Self care routine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGreen}>
            <Text style={styles.buttonText}>📖 Write Journal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
          <Text style={styles.tipText}>
            “Try a 10-minute mindful meditation before bed to improve sleep quality.”
          </Text>
          <TouchableOpacity>
            <Text style={styles.tipLink}>See all self-care Tips</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.messageTitle}>🔔 New message from Buddy</Text>
          <TouchableOpacity>
            <Text style={styles.messageLink}>→ Tap to view</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Buddy Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/(tabs)/chat')}
      >
        <Text style={styles.floatingText}>🧠</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  container: {
    padding: 20,
    backgroundColor: '#f4f0fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#532d80',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  moodBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  buttonBlue: {
    backgroundColor: '#dbeafe',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonGreen: {
    backgroundColor: '#bbf7d0',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  tipBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#fde68a',
  },
  tipTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipText: {
    marginBottom: 8,
  },
  tipLink: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#fca5a5',
  },
  messageTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageLink: {
    color: '#ef4444',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  floatingText: {
    fontSize: 24,
    color: 'white',
  },
});
