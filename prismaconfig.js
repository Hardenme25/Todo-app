// Import the prismaclient to be used in the code
import { PrismaClient } from "@prisma/client";

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Export the prisma instance for use in other parts of the application
export default prisma;