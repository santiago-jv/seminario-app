import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBGHXrabnEnLPdIFcmgFpAeDZiuAA1uppI",
  authDomain: "seminario-app.firebaseapp.com",
  databaseURL: "https://seminario-app-default-rtdb.firebaseio.com",
  projectId: "seminario-app",
  storageBucket: "seminario-app.appspot.com",
  messagingSenderId: "839760962836",
  appId: "1:839760962836:web:abb10a688d9e4568eb0e01",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const database: Database = getDatabase(app);

