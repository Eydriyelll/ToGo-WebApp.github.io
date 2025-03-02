import { auth, db } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

export type Task = {
  name: string
  deadline: string
  completed: boolean
}

export type ScheduleRow = {
  id: string
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
}

// User authentication functions
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with name
    await updateProfile(user, {
      displayName: name,
    })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date(),
    })

    return user
  } catch (error) {
    throw error
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw error
  }
}

// Task management functions
export const loadTasks = async (user: User) => {
  try {
    const tasksDoc = await getDoc(doc(db, "users", user.uid, "data", "tasks"))
    if (tasksDoc.exists()) {
      return tasksDoc.data().tasks as Task[]
    }
    return []
  } catch (error) {
    console.error("Error loading tasks:", error)
    return []
  }
}

export const saveTasks = async (user: User, tasks: Task[]) => {
  try {
    await setDoc(doc(db, "users", user.uid, "data", "tasks"), { tasks }, { merge: true })
  } catch (error) {
    throw error
  }
}

// Updated schedule management functions
export const loadSchedule = async (user: User) => {
  try {
    const scheduleDoc = await getDoc(doc(db, "users", user.uid, "data", "schedule"))
    if (scheduleDoc.exists()) {
      return scheduleDoc.data().scheduleRows as ScheduleRow[]
    }
    return []
  } catch (error) {
    console.error("Error loading schedule:", error)
    return []
  }
}

export const saveSchedule = async (user: User, schedule: ScheduleRow[]) => {
  try {
    // Convert schedule array to an object structure that Firestore can handle
    await setDoc(
      doc(db, "users", user.uid, "data", "schedule"),
      {
        scheduleRows: schedule.map((row) => ({
          id: row.id,
          time: row.time,
          monday: row.monday,
          tuesday: row.tuesday,
          wednesday: row.wednesday,
          thursday: row.thursday,
          friday: row.friday,
        })),
      },
      { merge: true },
    )
  } catch (error) {
    throw error
  }
}

