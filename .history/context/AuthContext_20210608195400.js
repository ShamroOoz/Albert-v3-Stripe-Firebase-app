import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, googleAuthProvider, getStripeRole, app } from '@/lib/firebase';
import Router from 'next/router';
import cookie from 'js-cookie';
import getStripe from '@/lib/stripe';
import { createUser } from '@/lib/db';

export const UserContext = createContext();

export function ProvideAuth({ children }) {
  const authData = useProvideAuth();
  return (
    <UserContext.Provider value={authData}>{children}</UserContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(UserContext);
};

function useProvideAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return auth.signInWithPopup(googleAuthProvider).then((response) => {
      handleUser(response.user);
      setLoading(false);
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

    return auth.signOut().then(() => handleUser(false));
  };

  ///
  async function createCheckoutSession(uid) {
    const checkoutSessionRef = await firestore
      .collection('users')
      .doc(uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1IzS2rLMgvU1cp6VANo43mYu',
        allow_promotion_codes: false,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });

    checkoutSessionRef.onSnapshot(async (snap) => {
      const { sessionId } = snap.data();

      if (sessionId) {
        const stripe = await getStripe();

        stripe.redirectToCheckout({ sessionId });
      }
    });
  }

  async function goToBillingPortal() {
    const functionRef = app()
      .functions('us-central1')
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/useraccount`
    });

    window.location.assign(data.url);
  }

  return {
    signinWithGoogle,
    signOut,
    createCheckoutSession,
    goToBillingPortal,
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
    stripeRole: await getStripeRole(),
    token
  };
};
