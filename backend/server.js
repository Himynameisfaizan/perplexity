import "dotenv/config";
import app from "./src/app.js";
import database from "./src/config/database.js";
import http from "http"
import { initSocket } from "./src/socket/server.socket.js";

database();

const httpServer = http.createServer(app)
initSocket(httpServer)

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
