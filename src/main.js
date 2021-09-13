// Setup service worker and call views.init.start

import { initDb, readPlants } from './db';
import start from './views/init';
import { app } from './fb';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

function setupServiceWorker() {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then((res) => console.log('service worker registered'));
}

function main() {
  if ('serviceWorker' in navigator) {
    setupServiceWorker();
  }

  initDb();
}
main();

document.addEventListener('DOMContentLoaded', start);
