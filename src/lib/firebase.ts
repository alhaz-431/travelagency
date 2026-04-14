import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// This will be populated by the set_up_firebase tool
const firebaseConfig = {
  apiKey: process.env.GEMINI_API_KEY, // Placeholder or real key
  authDomain: `${process.env.APP_URL?.split('//')[1]?.split('.')[0]}.firebaseapp.com`,
  projectId: process.env.APP_URL?.split('//')[1]?.split('.')[0],
  storageBucket: `${process.env.APP_URL?.split('//')[1]?.split('.')[0]}.appspot.com`,
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// In a real app, we would use the firebase-applet-config.json
// But for now, we'll initialize with a try-catch to prevent crashes
let app;
let auth: any;
let db: any;
let storage: any;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db, storage };
