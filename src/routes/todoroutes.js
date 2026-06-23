// Import the express framework to create a mini server
import express from "express";
// Import the prisma client for the database connection
import prisma from "../../prisma/prismaconfig.js";
// Create a miniserver
const router = express.Router();

// Handle a get request to get the default todos
router.get("/",  async (req,res) => {
    // Get the todos 
    const getTodos = await prisma.todos.findMany(
        {
            where: {
                user_id: req.user_id
            }
        }
    );
    // Now send the todos as a response 
    res.status(200).json(getTodos);
});

// Handle a request for adding a todo
router.post("/", async (req,res) => {
    // Get the todo from the request of the body
    const { task } = req.body;

    // Add the task to the todos table
    const new_todo = await prisma.todos.create(
        {
            data: {
                task: task,
                user_id: req.user_id
            }
        }
    );

    // Send the todo to the user
    res.json(new_todo);
});

// Handle a request for completing a todo
router.put("/:id", async (req,res) => {
    // Get the id from the request params since a single user can have multiple todos.
    const { id } = req.params;
    // Get the user_id from the request body
    const userid = req.user_id;
    
    // Update the todo to be completed
    const update_todo = await prisma.todos.update(
        {
            where: {
                id: id,
                user_id: userid
            },
            data: {
                completed: 1
            }
        }
    );

    // Send the todo to the user
    res.json({message: "Task completed!"});
});

// Handle a request for deleting a todo
router.delete("/:id", async (req,res) => {
    // Get the id from the request params since a single user can have multiple todos.
    const { id } = req.params;
    // Get the user_id from the request body
    const userid = req.user_id;
    
    // Delete the todo
    const delete_todo = await prisma.todos.delete(
        {
            where: {
                id: id,
                user_id: userid
            }
        }
    );
    // Send the todo to the user
    res.json({message: "Task deleted!"});
});
// export the created router 
export default router;