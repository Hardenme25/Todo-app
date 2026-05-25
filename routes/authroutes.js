// Import the express framework to create the mini server 
import express from "express";

// Create the first small instance of the express app
const router1 = express.Router();

// Create the route for the login page
router1.get("/register", (req, res) => {
    res.send("This is the login page");
});



// Export the router to be used in the server.js file
export default router1;