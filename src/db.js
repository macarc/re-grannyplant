// Functions for talking to firestore
// Also for creating backups

import { app } from './fb';
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  enableIndexedDbPersistence,
} from 'firebase/firestore';

const db = getFirestore();

export function initDb() {
  enableIndexedDbPersistence(db).catch(alert);
}

export async function saveToDb(plants) {
  await setDoc(doc(db, 'plants', 'plants'), { plants });
}

export async function readPlants() {
  const snapshot = await getDoc(doc(db, 'plants', 'plants'));
  return snapshot.data().plants;
}

export function saveBackup(plants) {
  const el = document.createElement('a');
  el.setAttribute(
    'href',
    'data:text/json;charset=utf-8, ' +
      encodeURIComponent(JSON.stringify(plants))
  );
  el.setAttribute('download', 'grannyplant-backup.json');
  el.click();
}
