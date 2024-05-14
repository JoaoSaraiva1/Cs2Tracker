import app from "./app";

const server = Bun.serve({
  port: 4987, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  hostname: "0.0.0.0", // defaults to $BUN_HOSTNAME, $HOSTNAME, $NODE_HOSTNAME otherwise 127.0.0.1
  fetch: app.fetch
});

console.log(server.port);
console.log(server.url);
