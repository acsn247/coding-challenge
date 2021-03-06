const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(express.static("public"));

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/transactions", (req, res) => {
  const { limit, offset } = req.query;
  console.log("Get Transaction, ", limit, offset);
  res.json(gen(limit, offset));
});

server = app.listen(4000, () => {
  console.log("Listen port 4000");
});

// function gen(v, e) {
//   const r = [];

//   const edges = {};
//   const nodes = [];
//   for (let i = 0; i < v; i++) {
//     nodes.push(i);
//     const nodeParents = [];
//     if (i > 0) {
//       const parent = rand() % i;
//       nodeParents.push(parent);
//       e--;

//       edges[`${parent}${i}`] = true;
//     }
//     r.push(nodeParents);
//   }

//   while (e > 0) {
//     const child = (rand() % (v - 1)) + 1;
//     const parent = rand() % child;

//     if (!edges[`${parent}${child}`]) {
//       edges[`${parent}${child}`] = true;
//       r[child].push(parent);
//       e--;
//     }
//   }

//   console.log(111, r);
//   return r;
// }

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

  const result = r.map((parents, index) => {
    return { id: index, status: getRandomInt(0, 2), parents };
  });

  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rand() {
  return Math.round(Math.random() * 100000);
}

// const io = require("socket.io")(server);
// io.on("connection", socket => {
//   console.log("New user connected");
//   setInterval(() => {
//     socket.emit("change_data", { data: gen(10, 10) });
//   }, 2000);
// });
