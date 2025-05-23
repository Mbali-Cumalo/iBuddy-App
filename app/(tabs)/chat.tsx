import { StyleSheet, Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧠 Chat with Buddy</Text>
      <Text style={styles.message}>Hi! I'm Buddy. Tell me what’s on your mind.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});
