# Use Node.js LTS version
FROM node:20

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# copy rest of the backend code
COPY . .

# expose port
EXPOSE 8081

# start the backend server
CMD ["npm","start"]
