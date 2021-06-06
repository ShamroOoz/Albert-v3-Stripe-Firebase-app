import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  auth,
  googleAuthProvider,
  db,
  firebaseConfig
} from '@/helpers/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseAppProvider } from 'reactfire';

export const UserContext = createContext();

export function ProvideAuth({ children }) {
  const authData = useProvideAuth();
  return (
    <UserContext.Provider value={authData}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        {!authData.loading && children}
      </FirebaseAppProvider>
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(UserContext);
};

function useProvideAuth() {
  const [user] = useAuthState(auth);
  const [activeplan, setactiveplan] = useState(null);
  const [loading, setloading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = db.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setactiveplan(
          doc.data()?.activePlans == null ? null : doc.data()?.activePlans
        );
        setloading(false);
      });
    } else {
      setactiveplan(null);
      setloading(false);
    }

    return unsubscribe;
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      const credential = await auth.signInWithPopup(googleAuthProvider);
      const { uid, email } = credential.user;
      return db.collection('users').doc(uid).set({ email }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    return await auth.signOut();
  };

  const login = ({ email, password }) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signup = ({ email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const sendPasswordResetEmail = ({ email }) => {
    return auth().sendPasswordResetEmail(email);
  };
  return {
    signInWithGoogle,
    signOut,
    login,
    signup,
    sendPasswordResetEmail,
    user,
    activeplan,
    loading,
    subscriptions,
    setSubscriptions
  };
}
