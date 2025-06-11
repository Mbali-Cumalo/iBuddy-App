import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { OPENAI_API_KEY } from '../../utils/config';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([
    '🤖 Hi! I\'m Buddy. Tell me what\'s on your mind.',
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = `🧍 You: ${input}`;
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are a friendly mental health and self-care assistant called Buddy. Be supportive, empathetic, and keep responses under 3 sentences.' 
            },
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;

      if (reply) {
        setMessages((prev) => [...prev, `🤖 Buddy: ${reply.trim()}`]);
      } else {
        setMessages((prev) => [...prev, '🤖 Buddy: Hmm, I didn\'t quite catch that.']);
      }
    } catch (err) {
      setMessages((prev) => [...prev, '❌ Buddy: I\'m having trouble connecting. Try again later.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>💬 Chat with Buddy</Text>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatBox}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, index) => (
            <View 
              key={index} 
              style={[
                styles.messageBubble,
                msg.startsWith('🧍') ? styles.userBubble : styles.buddyBubble
              ]}
            >
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ))}
          {loading && (
            <View style={[styles.messageBubble, styles.buddyBubble]}>
              <ActivityIndicator size="small" color="#8E6BBF" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#8E8E93"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={loading}
          >
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ... (keep the same StyleSheet as before)
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#BEA8CE', // Soft purple background
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6FA',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E2635',
    textAlign: 'center',
  },
  chatBox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#F0E6FA', // Light purple for user
    borderBottomRightRadius: 2,
  },
  buddyBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5', // Light gray for buddy
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#2E2635',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0E6FA',
  },
  input: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    borderColor: '#E3E3E7',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
    color: '#2E2635',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#8E6BBF', // Vibrant purple
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});