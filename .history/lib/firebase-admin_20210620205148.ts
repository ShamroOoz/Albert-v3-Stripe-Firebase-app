import admin from 'firebase-admin';

import serviceAccount from '../serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://project-7593499366566582076.firebaseio.com'
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
