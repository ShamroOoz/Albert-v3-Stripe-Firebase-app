import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, googleAuthProvider, db } from '@/lib/firebase';
import cookie from 'js-cookie';

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
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        auth().onIdTokenChanged(handleUser);
        setloading(false);
      } else {
        setloading(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return auth()
      .signInWithPopup(googleAuthProvider)
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signOut = async () => {
    return await auth.signOut();
  };

  return {
    signinWithGoogle,
    signOut,
    user,
    loading
  };
}
