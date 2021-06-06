import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, googleAuthProvider } from '@/lib/firebase';
import Router from 'next/router';
import cookie from 'js-cookie';

import { createUser } from '@/lib/db';

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(handleUser);
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

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('albert-auth', true, {
        expires: 1
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove('albert-auth');

      setLoading(false);
      return false;
    }
  };

  const signOut = async () => {
    Router.push('/');

    return auth()
      .signOut()
      .then(() => handleUser(false));
  };

  return {
    signinWithGoogle,
    signOut,
    user,
    loading
  };
}

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    // stripeRole: await getStripeRole(),
    token
  };
};
