// Import the express framework to create a mini server
import express from "express";
// import the database file
import db from "../db.js";


// Create a miniserver
const router = express.Router();

// Handle a get request to get the default todos
router.get("/", (req,res) => {
    // Get the todos 
    const getTodos = db.prepare(`
        SELECT * FROM todos WHERE  userId = ?   
    `);
    // Get the todos where the userid matches the one in the token.
    const todos = getTodos.all(req.userId);

    // Now send the todos as a response 
    res.status(200).json(todos);
});

// Handle a request for adding a todo
router.post("/", (req,res) => {
    // Get the todo from the request of the body
    const { task } = req.body;

    // Add the task to the todos table
    const new_todo = db.prepare(`
        INSERT INTO todos (task,user_id ) (?,?) 
    `);
    // Run the sql query
    const result = new_todo.run(task,req.userId);

    // Send the todo to the user
    res.json(new_todo);
});


// export the created router 
export default router;