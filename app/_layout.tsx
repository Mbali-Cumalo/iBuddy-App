import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from '../firebaseConfig';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const auth = getAuth(app);
  const router = useRouter(); // 👈 needed for manual redirects
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setChecking(false);

      // 🚨 Redirect if not signed in and on a protected route
      if (authUser) {
        // If logged in and on login/signup, go home
        if (['/login', '/signup'].includes(window.location.pathname)) {
          router.replace('/'); // or '/(tabs)' if needed
        }
      } else {
        // If not logged in, force login
        if (window.location.pathname !== '/login') {
          router.replace('/login');
        }
      }
    });

    return unsubscribe;
  }, []);

  if (checking) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
