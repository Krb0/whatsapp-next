import { useEffect } from "react";
import Login from "./login";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(doc(db, "users", user.uid), {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
