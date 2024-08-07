import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore'




const firebaseConfig = {
  apiKey: 'AIzaSyA0wjNiItUWWK2_GJ3TJ_JdN7U5 - _6Iugk',
  authDomain: 'advanced-todo-app-8c108.firebaseapp.com',
  projectId: 'advanced-todo-app-8c108',
  storageBucket: 'advanced-todo-app-8c108.appspot.com',
  messagingSenderId: '411819386387',
  appId: '1:411819386387:web:395d6a9c082382bbb4c1e6'
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

export {
  firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
}


