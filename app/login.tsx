import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/'); // Goes to the root tab screen
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to iBuddy</Text>
        <Text style={styles.subtitle}>Your mental wellness companion</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#8E8E93"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#8E8E93"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.link}>
            Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#BEA8CE', // Soft purple background
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E2635', // Dark purple-gray
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5E4B8B', // Medium purple
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FBFBFB',
    borderColor: '#E3E3E7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#2E2635',
  },
  loginButton: {
    backgroundColor: '#8E6BBF', // Vibrant purple
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#5E4B8B',
  },
  linkBold: {
    fontWeight: '600',
    color: '#8E6BBF',
  },
});