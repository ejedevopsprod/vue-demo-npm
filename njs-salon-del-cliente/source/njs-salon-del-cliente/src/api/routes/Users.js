const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const playersList = require("../../sampleData/players.json");
const UserController = require("../controllers/UserController.js");
const userController = new UserController();
const erroCodes = require("../status_codes/errors");
const validator = require("validator");
const xss = require("xss");

router.get("/players", async (req, res) => {
  const { user_name } = req.query;
  const players = await userController.listPlayers(user_name);
  res.json(players);
});

router.post("/aut", async (req, res) => {
  let { userName = '', email = '', empNumber = 0 } = req.body;
  userName = xss(userName);
  email = xss(email);
  empNumber = xss(`${empNumber}`);

  if (!validator.isInt(empNumber)) return res.json({
    ...erroCodes.expected_number,
    "Error": `The ${empNumber} is expected to be a number`
  });

  if (!validator.isEmail(email)) return res.json({
    ...erroCodes.expected_email,
    "Error": `The ${email} is expected to be an email`
  });

  if (!validator.isLength(userName, { min: 1 })) return res.json({
    ...erroCodes.empty_string,
    "Error": `The ${userName} should not be empty`
  });

  try {
    const user = await userController.verifyUser(userName, email, Number(empNumber));
    res.json({
      "StatusCode": 200,
      "User": user,
    });
  } catch (error) {
    console.log(error);
    res.json(erroCodes.unexpeted_error);
  }
});

router.post("/autadmin", async (req, res) => {
  let { userName = '', password = '' } = req.body;
  userName = xss(userName);
  password = xss(password);

  if (!validator.isLength(userName, { min: 1 })) return res.json({
    ...erroCodes.empty_string,
    "Error": `The ${userName} should not be empty`
  });

  if (!validator.isLength(password, { min: 1, max: 32 })) return res.json({
    ...erroCodes.empty_string,
    "Error": `The ${password} must be between 1 and 32 characters`
  });

  try {
    const user = await userController.autAdmin(userName, password);
    res.json({
      "StatusCode": 200,
      "User": user,
    });
  } catch (error) {
    console.log(error);
    res.json(erroCodes.unexpeted_error);
  }
});

router.post("/comment", async (req, res) => {
  const { userName = '', comment = '', worldType = '' } = req.body;
  userName = xss(userName);
  comment = xss(comment);
  worldType = xss(`${worldType}`);

  if (!validator.isLength(userName, { min: 1 })) return res.json({
    ...erroCodes.empty_string,
    "Error": `The ${userName} should not be empty`
  });

  if (!validator.isLength(comment, { min: 1 })) return res.json({
    ...erroCodes.empty_string,
    "Error": `The ${comment} should not be empty`
  });

  if (!validator.isInt(worldType)) return res.json({
    ...erroCodes.expected_number,
    "Error": `The ${worldType} is expected to be a number`
  });

  try {
    const user = await userController.addComment(userName, comment, Number(worldType));
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(erroCodes.unexpeted_error);
  }
});

module.exports = router;
