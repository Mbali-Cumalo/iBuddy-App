import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebaseConfig';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to save a journal entry.');
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'journals'), {
        entry,
        date: date.toISOString(),
        createdAt: new Date().toISOString(),
      });
      alert('Journal entry saved!');
      setEntry('');
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Failed to save journal entry.');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>📓 Write Your Journal</Text>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>🗓 {date.toDateString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <TextInput
          style={styles.input}
          multiline
          placeholder="Write about your day..."
          placeholderTextColor="#8E8E93"
          value={entry}
          onChangeText={setEntry}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Save Entry</Text>
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
    padding: 20,
    backgroundColor: 'white', // White card-like container
    margin: 16,
    borderRadius: 12,
    elevation: 4, // Shadow for Android
    shadowColor: '#2E2635', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E2635', // Dark purple-gray for contrast
  },
  input: {
    height: 200,
    borderColor: '#E3E3E7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    textAlignVertical: 'top',
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#FBFBFB', // Slightly off-white for the input area
    color: '#2E2635',
  },
  dateButton: {
    backgroundColor: '#F0E6FA', // Light purple for the date button
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4BBEB',
  },
  dateText: {
    fontSize: 16,
    color: '#5E4B8B', // Purple-gray text
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#8E6BBF', // Vibrant purple button
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#2E2635',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});