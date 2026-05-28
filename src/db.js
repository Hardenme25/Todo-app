// Import sqlite3 to create the database
import { DatabaseSync} from "node:sqlite";

// Create a new synchronous database
const db = new DatabaseSync("todo.db");

// Create a table for the users in the database
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
        );
`);

// Create a table for the todos in the database
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`);



// Export the database to be used in other files
export default db;