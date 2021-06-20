/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  auth,
  googleAuthProvider,
  getStripeRole,
  app,
  firestore
} from '@/lib/firebase';
import Router from 'next/router';
import cookie from 'js-cookie';
import getStripe from '@/lib/stripe';
import { createUser } from '@/lib/db';

interface Props {
  children: React.ReactNode;
}

const formatUser = async (user: {
  getIdToken: () => any;
  uid: any;
  email: any;
  displayName: any;
  providerData: { providerId: any }[];
  photoURL: any;
}) => {
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

function useProvideAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | boolean | null>(null);

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const dummyuser = await formatUser(rawUser);
      const { token, ...userWithoutToken } = dummyuser;

      createUser(dummyuser.uid, userWithoutToken);
      setUser(dummyuser);

      cookie.set(
        'albert-auth',
        { status: true },
        {
          expires: 1
        }
      );
      setLoading(false);
      return dummyuser;
    }
    setUser(false);
    cookie.remove('albert-auth');
    setLoading(false);
    return false;
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const signinWithGoogle = async () => {
    setLoading(true);
    return auth.signInWithPopup(googleAuthProvider).then((response) => {
      handleUser(response.user);
      setLoading(false);
    });
  };

  const signOut = async () => {
    Router.push('/');
    return auth.signOut().then(() => handleUser(false));
  };

  ///
  const createCheckoutSession = async (uid: string, priceId: any) => {
    setLoading(true);
    const checkoutSessionRef = await firestore
      .collection('users')
      .doc(uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        allow_promotion_codes: false,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });

    checkoutSessionRef.onSnapshot(async (snap) => {
      const { sessionId } = snap.data() as any | null;
      if (sessionId) {
        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId });
      }
      setLoading(false);
    });
  };

  const goToBillingPortal = async () => {
    setLoading(true);
    const functionRef = app()
      .functions('us-central1')
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/useraccount`
    });
    setLoading(false);
    window.location.assign(data.url);
  };

  return {
    signinWithGoogle,
    signOut,
    createCheckoutSession,
    goToBillingPortal,
    user,
    loading
  };
}

export type useProvideAuthResult = ReturnType<typeof useProvideAuth>;

export const UserContext = createContext<useProvideAuthResult | null>(null);

export const useAuth = () => {
  return useContext(UserContext);
};

export const ProvideAuth: React.FC<Props> = ({ children }: Props) => {
  const authData = useProvideAuth();
  return (
    <UserContext.Provider value={authData}>{children}</UserContext.Provider>
  );
};
