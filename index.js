const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());
let users = [
  {
    id: shortid.generate(),
    author: "Bernard M. Baruch",
    quote:
      "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
  },
  {
    id: shortid.generate(),
    author: "Oscar Wilde",
    quote: "Be yourself; everyone else is already taken.",
  },
  {
    id: shortid.generate(),
    author: "Mahatma Gandhi",
    quote: "Be the change that you wish to see in the world..",
  },
  {
    id: shortid.generate(),
    author: "Robert Frost",
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
  },
  {
    id: shortid.generate(),
    author: "Mark Twain",
    quote: "If you tell the truth, you don't have to remember anything.",
  },
];
function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createUser(data) {
  const payload = {
    id: shortid.generate(),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
}
server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});
server.get("/api/users", (req, res) => {
  const users = getUsers();
  res.status(200).json(users);
});
server.post("/api/users", (req, res) => {
  if (!req.body.author || !req.body.quote) {
    res.status(400).json({ errorMessage: "Please provide author and quote." });
  }

  const newUser = createUser({
    author: req.body.author,
    quote: req.body.quote,
  });

  res.status(201).json(newUser);
});
server.delete("/api/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (user) {
    deleteUser(user.id);

    res.status(204).end();
  } else {
    res.status(404).json({ message: "Specified ID does not exist." });
  }
});
server.put("/api/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "Specified ID does not exist." });
  } else if (!req.body.author || !req.body.quote) {
    res.status(400).json({ errorMessage: "Please provide author and quote." });
  } else {
    const updatedUser = updateUser(user.id, {
      author: req.body.author,
      quote: req.body.quote,
    });

    res.status(205).json(updatedUser);
  }
});

server.listen(7000, () => {
  console.log("server is up on port 7000");
});
