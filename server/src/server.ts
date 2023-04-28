import "reflect-metadata";
import http from "node:http";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";
import db from "./db";
import cors from "cors";
import resolvers from "./resolvers";
import { buildSchema } from "type-graphql";
import session from "express-session";
import { redisClient } from "./redis";
import mySession from "./mySession";

dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();
const httpServer = http.createServer(app);

async function main() {
  try {
    db.initialize();
    await redisClient.connect();
    app.use(session(mySession));
    const schema = await buildSchema({ resolvers, validate: false });
    const apolloServer = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();
    app.use(
      "/api",
      cors({ origin: "http://localhost:5173", credentials: true }),
      express.json(),
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => {
          return { req, res, db };
        },
      })
    );
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve)
    );
    console.log(`server running on port ${PORT}`);
    console.log(`open the api : http://localhost:${PORT}/api`);
  } catch (error) {
    console.log(error);
  }
}

main();
