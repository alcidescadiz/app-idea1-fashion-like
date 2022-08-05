import { Low, JSONFile } from "lowdb";
import {__dirname, path} from '../utils/dirPath.js'
let db;

export async function createConnection() {
  const file = path.join(__dirname, "../db.json");
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  await db.read();
  db.data ||= { post: [], users:[] };
  await db.write();
}

export const getConnection = () => db;