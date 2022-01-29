import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  where,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as EmailValidator from "email-validator";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_KEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DB_APP_ID,
};

const app = getApps.length < 1 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

// messages query getter

export const getRecipient = (recipientEmail) => {
  const usersCollection = collection(db, "users");
  return query(usersCollection, where("email", "==", recipientEmail));
};

export const getMessages = (id) => {
  const messagesCollection = collection(db, `chats/${id}/messages`);
  return query(messagesCollection, orderBy("timestamp", "asc"));
};
export const getChats = (user) => {
  const chatCollectionRef = collection(db, "chats");
  const filteredChats = query(
    chatCollectionRef,
    where("users", "array-contains", user?.email)
  );
  return filteredChats;
};

export const sendMessage = (e, id, user, input, setInput) => {
  e.preventDefault();
  const userRef = doc(db, "users", user.uid);
  const chatRef = collection(db, `chats/${id}/messages`);
  setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
  addDoc(chatRef, {
    timestamp: serverTimestamp(),
    message: input,
    user: user.email,
    photoURL: user.photoURL,
  });

  setInput("");
};

export const createChat = async (user) => {
  const input = prompt(
    "Please enter an email address for the user you wish to chat with"
  );
  if (!input) return;
  if (
    EmailValidator.validate(input) &&
    input !== user.email &&
    !(await chatAlreadyExists(input, user))
  ) {
    addDoc(collection(db, "chats"), { users: [user.email, input] });
  } else {
    alert("Email already exists or Invalid Email");
  }
};

export const chatAlreadyExists = async (recipientEmail, user) => {
  const chats = getChats(user);
  const docsSnapshot = await getDocs(chats);

  const foundDoc = docsSnapshot.docs.find((doc) =>
    doc.data().users.includes(recipientEmail)
  );
  if (foundDoc) return true;
  else return false;
};

export { db, auth, provider };
