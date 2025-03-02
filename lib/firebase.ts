// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcvIrNfYZZ4FPfpJFwJnmISVI8IGPIBd4",
  authDomain: "togo-1611c.firebaseapp.com",
  projectId: "togo-1611c",
  storageBucket: "togo-1611c.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "707519481653",
  appId: "1:707519481653:web:90879792cf287570f72e7c",
  measurementId: "G-QFGY71W129",
}

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Get Firebase services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }

