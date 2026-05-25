// Import the express frmawork to create the server
import express from "express";
// Import the auth routes to be used in the server
import router1 from "../routes/authroutes.js";

// Create the app
const app = express();

// Create the port to which the app in listenning. Note that dont forget to include the port in the env file
const PORT = process.env.PORT || 3002;

// Use the auth routes in the app
app.use("/", router1);





// Let the app listen to the port in the env file
app.listen(PORT, () => {
    console.log(`The server has started on ${PORT}`);
});