import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../firebaseConfig';

export default function HomeScreen() {
  const router = useRouter();
  const moods = ['😄', '😊', '😐', '😢', '😡'];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // 💡 Cute tips array
  const tips = [
    "🌼 Take a deep breath — you're doing better than you think!",
    "🧸 Give yourself a hug today. You’ve earned it.",
    "🌙 Try a 10-minute wind-down stretch before bed. Your dreams will thank you!",
    "☀️ Say one kind thing to yourself today — out loud!",
    "🫖 Sip something warm and slow. Be in the moment.",
    "🎧 Put on your favorite feel-good song. Dance a little!",
    "💌 Write a mini love note to yourself. Yes, really!",
    "🐾 Pet something fluffy. Or imagine it. That counts too.",
    "📴 Take a tiny break from screens. Your brain will smile.",
    "💬 Tell someone you're proud of them — including yourself!"
  ];

  // 🌟 Get consistent random tip for the day
  const today = new Date().toISOString().split("T")[0];
  function getDailyTipIndex(dateString: string, numberOfTips: number): number {
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % numberOfTips);
  }

  const tipIndex = getDailyTipIndex(today, tips.length);
  const dailyTip = tips[tipIndex];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSelfCare = () => {
    if (!selectedMood) {
      alert("Please select how you're feeling first.");
      return;
    }

    router.push(`/selfcare?mood=${encodeURIComponent(selectedMood ?? '')}`);
  };

  const handleWriteJournal = () => {
    router.push('/journal');
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome to iBuddy</Text>
        <Text style={styles.subtitle}>
          A safe space to express yourself, track your mood, and receive personalized wellness tips.
        </Text>

        <View style={styles.moodBox}>
          <Text style={styles.label}>How are you feeling today?</Text>
          <View style={styles.moodRow}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                onPress={() => setSelectedMood(mood)}
                style={[
                  styles.moodButton,
                  selectedMood === mood && styles.selectedMood,
                ]}
              >
                <Text style={styles.moodEmoji}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonBlue} onPress={handleSelfCare}>
            <Text style={styles.buttonText}>🧘 Self care routine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGreen} onPress={handleWriteJournal}>
            <Text style={styles.buttonText}>📖 Write Journal</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.buttonBlue, { marginBottom: 20 }]}
           onPress={() => router.push('/journal-entries')}
>
  <Text style={styles.buttonText}>📚 View Past Journals</Text>
</TouchableOpacity>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
          <Text style={styles.tipText}>{dailyTip}</Text>
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

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/(tabs)/chat')}
      >
        <Text style={styles.floatingText}>🧠</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#BEA8CE', // Soft purple background (your request)
  },
  container: {
    padding: 20,
    backgroundColor: 'transparent', // Ensure no overlapping colors
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E2635', // Dark purple-gray for better contrast
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#4A4458', // Muted purple text
  },
  moodBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#2E2635', // Darker shadow for visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2E2635',
    fontWeight: '500',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  moodButton: {
    backgroundColor: '#F0E6FA', // Lighter purple for unselected
    padding: 12,
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: '#D4BBEB', // Soft purple for selection
    borderWidth: 1,
    borderColor: '#8E6BBF',
  },
  moodEmoji: {
    fontSize: 28,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  buttonBlue: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#6A5ACD', // Slate blue accent
  },
  buttonGreen: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#7B9F78', // Muted green accent
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#2E2635',
  },
  tipBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#D8BFD8', // Thistle accent (soft purple)
  },
  tipTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2E2635',
  },
  tipText: {
    marginBottom: 8,
    color: '#4A4458',
    lineHeight: 22,
  },
  tipLink: {
    color: '#6A5ACD', // Slate blue link
    textDecorationLine: 'underline',
  },
  messageBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#E6A8CE', // Pink-purple accent
  },
  messageTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2E2635',
  },
  messageLink: {
    color: '#B76E79', // Dusty rose link
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6A5ACD', // Slate blue
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingText: {
    fontSize: 24,
    color: 'white',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#B76E79', // Dusty rose
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});