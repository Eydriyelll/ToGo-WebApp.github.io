import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js"

const firebaseConfig = {
  apiKey: "AIzaSyDcvIrNfYZZ4FPfpJFwJnmISVI8IGPIBd4",
  authDomain: "togo-1611c.firebaseapp.com",
  projectId: "togo-1611c",
  storageBucket: "togo-1611c.firebasestorage.app",
  messagingSenderId: "707519481653",
  appId: "1:707519481653:web:90879792cf287570f72e7c",
  measurementId: "G-QFGY71W129",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }

