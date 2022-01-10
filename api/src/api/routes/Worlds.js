const { Router } = require("express");
const router = Router();
const worldsList = require("../../sampleData/worlds.json");
const WorldController = require("../controllers/WorldController.js");
const Game = require("../model/Game.js");
const worldController = new WorldController();

router.get("/", async (req, res) => {
  const { user } = req.query;
  const worlds = await worldController.getUserWorlds(user);
  res.json(
    worlds.map((e) => {
      e.active = Boolean(e.active.readInt8());
      return e;
    })
  );
});

router.put("/score", async (req, res) => {
  const { userName, worldType, score, time } = req.body;
  if (
    typeof userName === "string" &&
    typeof worldType === "number" &&
    typeof score === "number" &&
    typeof time === "number"
  ) {
    const world = await worldController.setScore(
      userName,
      worldType,
      score,
      time
    );
    res.json(world);
  } else {
    res.status(400).send("error");
  }
});

router.put("/status", async (req, res) => {
  const { userName, worldType, active } = req.body;
  const world = await worldController.setStatus(userName, worldType, active);
  res.json(world);
});

module.exports = router;
