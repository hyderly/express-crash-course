const express = require("express");
const router = express.Router();
const members = require("../../Members");

router.get("/", (req, res) => res.json(members));

router.get("/:id", (req, res) => {
  const found = members.some((members) => members.id === +req.params.id);

  if (found) res.json(members.filter((member) => member.id === +req.params.id));
  else res.status(404).json(`User with id ${req.params.id} not found`);
});

router.get("/role/:role", (req, res) => {
  const found = members.some((members) => members.role === req.params.role);
  if (found) {
    res.json(members.filter((member) => member.role === req.params.role));
  } else {
    res.status(404).json(`User with role ${req.params.role} not found`);
  }
});

module.exports = router;
