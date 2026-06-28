# Define the system on which the backend environment is going to run
FROM node:22-alpine

# Now we set up our working directory
WORKDIR /app

# Copy the package files because they let us use some tools to the current folder where this is all happening.
COPY package*json .

# Now install all the dependencies
RUN npm install

# Copy your Prisma schema folder explicitly before generating 👇
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the files
COPY . . 

# Expose the container
EXPOSE 3002

# Define the command to run the app on the docker 
CMD ["node", "./src/server.js"]

