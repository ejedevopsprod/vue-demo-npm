const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const playersList = require("../../sampleData/players.json");
const UserController = require("../controllers/UserController.js");
const userController = new UserController();

router.get("/players", async (req, res) => {
  const { user_name } = req.query;
  const players = await userController.listPlayers(user_name);
  res.json(players);
});

router.post("/aut", async (req, res) => {
  const { userName, email, empNumber } = req.body;
  if (
    typeof userName === "string" &&
    typeof email === "string" &&
    typeof empNumber === "number"
  ) {
    const user = await userController.verifyUser(userName, email, empNumber);
    res.send(user);
  } else {
    res.sendStatus(400);
  }
});

router.post("/autadmin", async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  if (typeof userName === "string" && typeof password === "string") {
    const user = await userController.autAdmin(userName, password);
    res.json(user);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
