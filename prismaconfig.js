import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import * as BetterSqlite3 from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import "dotenv/config";

const client = new Database(process.env.DATABASE_URL);
const adapter = new BetterSqlite3.BetterSqlite3Adapter(client);

const prisma = new PrismaClient({ adapter });

export default prisma;