import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, googleAuthProvider, db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const UserContext = createContext();

export function ProvideAuth({ children }) {
  const authData = useProvideAuth();
  return (
    <UserContext.Provider value={authData}>
      {!authData.loading && children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(UserContext);
};

function useProvideAuth() {
  const [user] = useAuthState(auth);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setloading(false);
      } else {
        setUser(false);
        setloading(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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

  return {
    signInWithGoogle,
    signOut,
    user,
    loading
  };
}
