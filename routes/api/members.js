const { json } = require("express");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Read
router.get("/", (req, res) => res.json(members));

router.get("/:id", (req, res) => {
  const found = members.some((members) => members.id === +req.params.id);

  if (found) {
    res.json(members.filter((member) => member.id === +req.params.id));
  } else {
    res.status(400).json(`User with id ${req.params.id} not found`);
  }
});

router.get("/role/:role", (req, res) => {
  const found = members.some((members) => members.role === req.params.role);

  if (found) {
    res.json(members.filter((member) => member.role === req.params.role));
  } else {
    res.status(404).json(`User with role ${req.params.role} not found`);
  }
});

// Add Member  (Create)
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  if (!newMember.name || !newMember.email) {
    res.status(404).json("Must put name and email");
  } else members.push(newMember);

  res.json(members);
});

<<<<<<< HEAD

// Update member
router.put("/:id", (req, res) => {
  const found = members.some((members) => members.id === +req.params.id);

  if(found){
    const newudMember = req.body;
    members.forEach(member => {
      if(member.id === +req.params.id){
        member.name = newudMember.name ? newudMember.name : member.name;
        member.email = newudMember.email ? newudMember.email : member.email;
        member.role = newudMember.role ? newudMember.role : member.role;

        res.json(members);
      }
    })
  }else{
    res.status(400).json(`User with id ${req.params.id} is not found`)
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((members) => members.id === +req.params.id);

  if(found){
    res.json({msg: 'User deleted', members: members.filter(member => member.id !== +req.params.id)})
  }else{
    res.status(400).json(`User with id ${req.params.id} not Found`);
  }
})
=======
// Updtae Member  (Update)
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    const newMember = req.body;
    members.forEach((member) => {
      if (member.id === +req.params.id) {
        member.name = newMember.name ? newMember.name : member.name;
        member.email = newMember.email ? newMember.email : member.email;
        member.role = newMember.role ? newMember.role : member.role;

        res.json(`User ${member.name} is successfully update`, member);
      }
    });
  } else {
    res.status(404).json(`Member with id ${req.params.id} is not found`);
  }
});

// Delete Members  (Delete)
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    res.json({
      msg: "User deleted",
      members: members.filter((member) => member.id !== +req.params.id),
    });
  } else {
    res.json(`User not found with id ${req.params.id}`);
  }
});
>>>>>>> e65c8530955aded15a5e28be0937b738849593ba


module.exports = router;
