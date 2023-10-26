import { Database, equalTo, get, orderByChild, query, ref } from "firebase/database";
import "../config/firebase.config";
import { database } from "../config/firebase.config";

export class FirebaseService {
  private database: Database;

  constructor() {
    this.database = database;
  }

  public async getValueUsingWhereClause(path: string, key: string, value: string) {
    const reference = ref(this.database, path);
    const queryBy = query(reference, orderByChild(key), equalTo(value));
    const snapshot = await get(queryBy);
    const snapshotvalue = snapshot.val();
    const firstKey = Object.keys(snapshotvalue)[0];
    return snapshotvalue[firstKey];
  }
}

export const firebaseService = new FirebaseService();
