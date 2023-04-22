FROM node:19-alpine

# SET WORK DIRECTORY
WORKDIR /app

# COPY PACKAGES
COPY package.json ./
COPY yarn.lock ./

# INSTALLING DEPENDENCIES
RUN yarn

# COPY THE REMAINNIG APP

COPY . .


EXPOSE 5173

# Start the React app
CMD ["yarn", "dev"]