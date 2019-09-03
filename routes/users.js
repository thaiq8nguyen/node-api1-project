const express = require("express");
const router = express.Router();
const db = require("../data/db");

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json({ error: false, users: users });
  } catch (errors) {
    res
      .status(500)
      .json({ error: true, message: "Unable to retrieve all users" });
  }
});

// get a specific user
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.findById(id);
    res.status(200).json({ error: false, user: user });
  } catch (errors) {
    res
      .status(500)
      .json({ error: true, message: "Unable to retrieve the user" });
  }
});

// create a new user
router.post("/users/", async (req, res) => {
  try {
    const user = await db.insert(req.body);
    res.status(200).json({ error: false, user: user });
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to create the user" });
  }
});

//update a user
router.put("/users/:id", async (req, res) => {
  try {
    const isUpdated = await db.update(req.params.id, req.body);

    const updatedUser = await db.findById(req.params.id);

    res.status(200).json({ error: false, user: updatedUser });
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to update the user" });
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const isDeleted = await db.remove(req.params.id);

    res.status(200).json({ error: false, user: isDeleted });
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to delete the user" });
  }
});

module.exports = router;
