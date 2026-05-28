// Import the express framework to create the mini server 
import express from "express";
// Import the bcrypt library to hash the password and make it more secure
import bcrypt from "bcrypt";
// Import the jwt module to create a token.
import jwt from "jsonwebtoken";
// Import the database to be used in the routes
import db from "../db.js";
// Import the dotenv module to load the environment variables from the .env file
import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();

// Create the first small instance of the express app
const router1 = express.Router();

// Create the route for the register page
router1.post("/register", (req, res) => {
    // Get the password and username to be stored in the database from the req body
    const {username, password} =  req.body;
    // Hash the password using a synchronous bcrypt hashing.
    const hashPassword =  bcrypt.hashSync(password, 8);

    // Insert the username and the hashed password into the database
    try{
        // Prepare the sql query
        const insertData = db.prepare(`
            INSERT INTO users (username,password) VALUES (?, ?)
        `);
        // Now run the sql query
        const new_user = insertData.run(username,hashPassword);

        // Now create a default todo
        const insertTodo = db.prepare(`
            INSERT INTO todos (user_id, task) VALUES (?,?)
        `);

        // Create a default todo for the user
        const defaultTodo = "Welcome to your todo list :) This is your first task. You can edit or delete it.";
        // Run the query
        insertTodo.run(new_user.lastInsertRowId, defaultTodo);

        // Get the user id of the user that was just created
        const userId = new_user.lastInsertRowId;

        // Create a token that you are going to  give to a user
        const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "24h"});

        // Send the token to the user
        res.status(200).json({token});
    }
    catch (err)
    {
        // Display the error
        console.log(err.message);
        // If the error is that the username already exists, then send a message to the user
        if (err.message.includes("UNIQUE constraint failed"))
        {
            return res.status(400).json({message: "Username already exists"});
        }
        // If its another error, then send a general error messagge
        else
        {
            // I think this is okay to stop the server.
            return res.status(500).json({message: "An error occurred"});
        }
    }
});

// Create the route for the login page
router1.post("/login", (req, res) => {
    // Get the username and password from the req body
    const {username,password} = req.body;

    // Get the user from the database
    try {
        const getUser = db.prepare(`
        SELECT * FROM  users WHERE username = ?
    `);
    // Now get run the query
    const user = getUser.get(username);

    // Now check if a user exists
    if (!user) {
        return res.status(400).json({message: "Invalid username or password"});
    }
    // If the user exists now check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    // If the password is not valid, then send a message to the user
    if (!isPasswordValid) {
        return res.status(400).json({message: "Invalid username or password"});
    }

    // If the password is valid, then create a token for the user
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"});

    // Send the token to the user
    res.status(200).json({token});
    } catch (err) {
        // Display the error
        console.log(err.message);
        // If its another error, then send a general error messagge
        return res.status(500).json({message: "An error occurred"});
    }  
});


// Export the router to be used by the server
export default router1;