import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCYgW-zLlagVimmnhDo961utKRabU9PU9M",
  authDomain: "ninja-series.firebaseapp.com",
  projectId: "ninja-series",
  storageBucket: "ninja-series.appspot.com",
  messagingSenderId: "440337883558",
  appId: "1:440337883558:web:86f857d23d175c3e706f67"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const storage = getStorage()

export { db, storage }

