const express = require("express");
const server = require("node:http").createServer();
const app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => {
  console.log("server started on port 3000");
});

/** Begin websocket */

const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws) {
  const numClients = wss.clients.size;
  console.log("Clients connected", numClients);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to my server");
  }

  ws.on("close", function close() {
    wss.broadcast(`Current visitors: ${numClients}`);
    console.log("A client has disconected");
  });
});

wss.broadcast = (data) => {
  for (client of wss.clients) {
    client.send(data);
  }
};
