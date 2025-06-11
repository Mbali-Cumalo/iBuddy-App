import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebaseConfig';

interface JournalEntry {
  id: string;
  entry: string;
  date: string;
  createdAt: string;
}

export default function JournalEntriesScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, 'users', user.uid, 'journals'),
          orderBy('date', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<JournalEntry, 'id'>)
        }));
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch journals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗂 My Journal Entries</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : entries.length === 0 ? (
        <Text style={styles.noEntry}>No entries yet.</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entryBox}>
              <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
              <Text style={styles.entry}>{item.entry}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F3FF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#4B3F72' },
  entryBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  date: { fontWeight: 'bold', marginBottom: 5, color: '#555' },
  entry: { fontSize: 16, color: '#333' },
  noEntry: { textAlign: 'center', color: '#666' },
});
