import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

// app
export function app() {
  return firebase.app();
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();

export const getStripeRole = async (rawUser) => {
  await rawUser.getIdToken(true);
  const decodedToken = await rawUser.getIdTokenResult();
  return decodedToken.claims.stripeRole || 'free';
};
