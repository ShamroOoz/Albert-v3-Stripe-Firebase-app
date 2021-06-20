import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

const params = {
  type: serviceAccount.type,
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id,
  privateKeyId:
    process.env.FIREBASE_PRIVATE_KEY || serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: 'https://project-7593499366566582076.firebaseio.com'
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
