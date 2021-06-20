import { firestore } from '@/lib/firebase';
import firebase from 'firebase';

//
// eslint-disable-next-line import/prefer-default-export
export function createUser(
  uid: string,
  data: Partial<firebase.firestore.DocumentData>
) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
