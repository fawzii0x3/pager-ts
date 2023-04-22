import "reflect-metadata";
import http from "node:http";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as dotenv from "dotenv";
import db from "./db";
import cors from "cors";
import resolvers from "./resolvers";
import { buildSchema } from "type-graphql";
dotenv.config()
const PORT = process.env.SERVER_PORT;

const expressServer = express();
const httpServer = http.createServer(expressServer);

async function main() {
  try {
    db.initialize();
    const schema = await buildSchema({ resolvers, validate: false });
    const apolloServer = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();
    expressServer.use(
        "/api",
        cors({ origin: "*" }),
        express.json(),
        expressMiddleware(apolloServer, {
          context: async ({ req,res }) => {
            return { req,res };
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
