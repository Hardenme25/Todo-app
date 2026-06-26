// Import the prisma client for the database connection
import { PrismaClient } from './src/generated/prisma/default.js';

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Export the prisma client to be used in other files
export default prisma;