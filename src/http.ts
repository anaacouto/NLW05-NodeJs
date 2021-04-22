import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "./database";
import path from "path";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
  return res.render("html/client.html");
});

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando protocolo ws

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io };
