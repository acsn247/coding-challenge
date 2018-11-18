const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

server = app.listen(4000, () => {
  console.log("Listen port 4000");
});

function gen(v, e) {
  const r = [];

  const edges = {};
  const nodes = [];
  for (let i = 0; i < v; i++) {
    nodes.push(i);
    const nodeParents = [];
    if (i > 0) {
      const parent = rand() % i;
      nodeParents.push(parent);
      e--;

      edges[`${parent}${i}`] = true;
    }
    r.push(nodeParents);
  }

  while (e > 0) {
    const child = (rand() % (v - 1)) + 1;
    const parent = rand() % child;

    if (!edges[`${parent}${child}`]) {
      edges[`${parent}${child}`] = true;
      r[child].push(parent);
      e--;
    }
  }

  return r;
}

function rand() {
  return Math.round(Math.random() * 100000);
}

const io = require("socket.io")(server);
io.on("connection", socket => {
  console.log("New user connected");
  setInterval(() => {
    socket.emit("change_data", { data: gen(10, 12) });
  }, 2000);
});
