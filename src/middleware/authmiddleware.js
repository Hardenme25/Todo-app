// Import the jwt module to verify the tokens
import jwt, { decode } from "jsonwebtoken";
// Import the dotenv module to configure .env files in the files
import dotenv  from "dotenv";

// Configure the .env files in the code 
dotenv.config();

// Create a function that you are going to export
function authmiddleware (req,res,next) {
    // Get the token from the request header.
    const token =  req.headers['authorization'];

    // If the token doesnt exist
    if (!token) {
        return res.status(401).json({message:"Token doesnt exist!"});
    }
    // If the token exists proceed to verify it
    jwt.verify(token, process.env.JWT_SECRET, (err,decode) => {
        // Check there is an err in the verification process
        if (err) {
            return res.status(402).json({message:"Error during token verification!"});
        }
        // If there is no error get set the user_id of the request to be used in configuration of the todo routes.
        req.user_id = decode.id;
        // Now proceed to the next line of code 
        next();
    });
};

// Export the function 
export default authmiddleware;