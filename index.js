const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();

// initialize middleware
// app.use(logger);

app.get("/api/members", (req, res) => res.json(members));

app.get("/api/members/:id", (req, res) => {
  const found = members.some((members) => members.id === +req.params.id);

  if (found) res.json(members.filter((member) => member.id === +req.params.id));
  else res.status(404).json(`User with id ${req.params.id} not found`);
});

app.get("/api/members/role/:role", (req, res) => {
  const found = members.some((members) => members.role === req.params.role);
  if (found) {
    res.json(members.filter((member) => member.role === req.params.role));
  } else {
    res.status(404).json(`User with role ${req.params.role} not found`);
  }
});

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is running at localhost:${PORT}`));
