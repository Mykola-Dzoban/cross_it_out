import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import FirebaseFactory from './firebaseFactory';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseProvider = new GoogleAuthProvider();

export const firebaseCollections = {
	users: 'users',
	dbUsers: `${process.env.NODE_ENV}_users`,
	dbProjects: `${process.env.NODE_ENV}_projects`,
	dbTasks: `${process.env.NODE_ENV}_tasks`,
};

export const users = new FirebaseFactory(firebaseFirestore, firebaseCollections.users);
export const dbUsers = new FirebaseFactory(firebaseFirestore, firebaseCollections.dbUsers);
export const dbProjects = new FirebaseFactory(firebaseFirestore, firebaseCollections.dbProjects);
export const dbTasks = new FirebaseFactory(firebaseFirestore, firebaseCollections.dbTasks);
