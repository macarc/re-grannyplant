// Firebase app, needed for talking to firestore
// And authentication

import { initializeApp } from 'firebase/app';

export const app = initializeApp({
  apiKey: 'AIzaSyAx6QoU7LVOOs_i-m-MYYLYvw2FZYXklJg',
  authDomain: 'granny-plant.firebaseapp.com',
  projectId: 'granny-plant',
});
