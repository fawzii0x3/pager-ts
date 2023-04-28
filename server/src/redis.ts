import Store from "connect-redis";
import { createClient } from "redis";

// Initialize client.
const redisClient = createClient({
    url:"redis://redis:6379"
});

// Initialize store.
const redisStore = new Store({
  client: redisClient,
  disableTouch:true,
});

export { redisClient, redisStore };
