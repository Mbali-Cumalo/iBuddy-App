import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBFlJhXNiCL8Uh6HRMFQkOKvGvAThXugHE",
  authDomain: "ibuddy-564b4.firebaseapp.com",
  projectId: "ibuddy-564b4",
  storageBucket: "ibuddy-564b4.appspot.com", // 🔁 Fixed typo: use .appspot.com
  messagingSenderId: "242629884294",
  appId: "1:242629884294:web:f5917a48fa12ded741d407"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

export { app, auth, db }; // ✅ Export `db` for use in signup, journal, etc.


