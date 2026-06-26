// Import the express framework to create the mini server 
import express from "express";
// Import the bcrypt library to hash the password and make it more secure
import bcrypt from "bcrypt";
// Import the jwt module to create a token.
import jwt from "jsonwebtoken";
// Import the dotenv module to load the environment variables from the .env file
import dotenv from "dotenv";
// Import the prisma client for the database connection
import prisma from "../../prismaconfig.js";

// Load the environment variables from the .env file
dotenv.config();

// Create the first small instance of the express app
const router1 = express.Router();

// Create the route for the register page
router1.post("/register",  async (req, res) => {
    // Get the password and username to be stored in the database from the req body
    const {username, password} =  req.body;
    // Hash the password using a synchronous bcrypt hashing.
    const hashPassword =  bcrypt.hashSync(password, 8);

    // Insert the username and the hashed password into the database
    try{
        // Insert the username and the hashed password into the database using prisma client
        const insertData = await prisma.user.create(
            {
                data: {
                    username: username,
                    password: hashPassword
                }
            }
        );

        // Create a default todo for the user
        const defaultTodo = "Welcome to your todo list :) This is your first task. You can edit or delete it.";
        // Insert the default todo into the todos table
        const todo =  await prisma.todos.create(
            {
                data: {
                    task: defaultTodo,
                    user_id: insertData.id
                }
            }
        );

        // Create a token that you are going to  give to a user
        const token = jwt.sign({id: insertData.id}, process.env.JWT_SECRET, {expiresIn: "24h"});

        // Send the token to the user
        if (token) {
            return res.json({token});
        }
        
    }
    catch (err)
    {
        // Display the error
        console.error(err.message);
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
router1.post("/login", async (req, res) => {
    // Get the username and password from the req body
    const {username,password} = req.body;

    // Get the user from the database
    try {
        const getUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

    // Now check if a user exists
    if (!getUser) {
        return res.status(400).json({message: "Invalid username or password"});
    }
    // If the user exists now check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, getUser.password);
    // If the password is not valid, then send a message to the user
    if (!isPasswordValid) {
        return res.status(400).json({message: "Invalid username or password"});
    }

    // If the password is valid, then create a token for the user
    const token = jwt.sign({id: getUser.id}, process.env.JWT_SECRET, {expiresIn: "24h"});

    // Send the token to the user
    if (token) {
        return res.json({token});   
    }

    // Time to catch some errors
    } catch (err) {
        // Display the error
        console.error(err.message);
        // If its another error, then send a general error messagge
        return res.status(500).json({message: "An error occurred"});
    }  
});


// Export the router to be used by the server
export default router1;