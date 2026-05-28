// Import the express frmawork to create the server
import express from "express";
// Import the auth routes to be used in the server
import router1 from "./routes/authroutes.js";
// Import a path module to be used in the server. These are gong to help me get the file directory and connect it to the backend
import path, {dirname} from "path";
// Importing the file url to help me easily navigate through the file directory or file path
import { fileURLToPath } from "url";
// Import the dotenv module to load the environment variables from the .env file
import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();

// Create the app
const app = express();

// Create the port to which the app in listenning. Note that dont forget to include the port in the env file
const PORT = process.env.PORT || 3002;

// Get the file name for the current file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name for the current file
const __dirname = dirname(__filename);

// Connect the public folder to the backend to be able to access the files in the public folder
const frontend = path.join(__dirname, "../public");

// Use the frontend in the backend. This is going to loaad the frontend to your root directory
app.use(express.static(frontend));

// Let the app translate the json from the req header
app.use(express.json());

// Use the router1 for the auth routes
app.use("/auth", router1);


// Let the app listen to the port in the env file
app.listen(PORT, () => {
    console.log(`The server has started on ${PORT}`);
});