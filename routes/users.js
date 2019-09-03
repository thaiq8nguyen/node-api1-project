const express = require("express");
const router = express.Router();
const db = require("../data/db");

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json({ error: false, users: users });
  } catch (errors) {
    res.status(500).json({
      error: true,
      message: "The users information could not be retrieved."
    });
  }
});

// get a specific user
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.findById(id);
    res.status(200).json({ error: false, user: user });
  } catch (errors) {
    res.status(500).json({
      error: true,
      message: "The user with the specified ID does not exist."
    });
  }
});

// create a new user
router.post("/users/", async (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      error: true,
      message: "Please provide name and bio for the user."
    });
  }
  try {
    const user = await db.insert(req.body);
    res.status(201).json({ error: false, user: user });
  } catch (errors) {
    res.status(500).json({
      error: true,
      message: "There was an error while saving the user to the database"
    });
  }
});

//update a user
router.put("/users/:id", async (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      error: true,
      message: "Please provide name and bio for the user."
    });
  }
  try {
    const isUpdated = await db.update(req.params.id, req.body);

    if (isUpdated !== 1) {
      res.status(404).json({
        error: false,
        message: "The user with the specified ID does not exist."
      });
    }

    const updatedUser = await db.findById(req.params.id);

    res.status(200).json({ error: false, user: updatedUser });
  } catch (errors) {
    res.status(500).json({
      error: true,
      message: "The user information could not be modified."
    });
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const isDeleted = await db.remove(req.params.id);
    if (isDeleted !== 1) {
      res.status(404).json({
        error: false,
        message: "The user with the specified ID does not exist."
      });
    }
    res.status(200).json({ error: false, user: isDeleted });
  } catch (errors) {
    res
      .status(500)
      .json({ error: true, message: "The user could not be removed" });
  }
});

module.exports = router;
