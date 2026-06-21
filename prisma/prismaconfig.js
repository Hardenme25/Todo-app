// Importing the Prisma Client instance from the generated Prisma client package
import { prismaClient } from "@prisma/client";

// Creating an install to be exported
const prisma = new prismaClient();

// Exporting the prisma instance to be used in other parts of the application
export default prisma;