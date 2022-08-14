import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

const db = new JsonDB(new Config(process.env.DB_PATH, true, false, "/"));

export default db;
