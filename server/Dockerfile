FROM node:18

# SET WORK DIRECTORY
WORKDIR /app/

# COPY PACKAGES
COPY package*.json ./
COPY *.lock ./

# INSTALLING DEPENDENCIES
RUN yarn

# COPY THE REMAINNIG APP

COPY . .



# Start the node server
CMD ["yarn", "dev"]


EXPOSE ${SERVER_PORT}