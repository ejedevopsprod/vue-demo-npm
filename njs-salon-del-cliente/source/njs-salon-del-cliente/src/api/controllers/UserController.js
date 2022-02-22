//const playersJSON = require("../../sampleData/players.json");
const UserService = require("../services/UserService.js");
const User = require("../model/User.js");

class UserController {
  constructor() {
    this._userService = new UserService();
  }

  async listPlayers(aut_key) {
    if (await this._userService.validateAdminPermissions(aut_key)) {
      //get db players
      return await this._userService.Players;
      //return playersJSON
    } else {
      return { message: "Not authorized" };
    }
  }

  getPlayerById(aut_key) {
    //get db players
    return this._userService.Player(aut_key);
    //return playersJSON[0]
  }

  async addUser(userName, email, empNumber, role) {
    let user = new User(userName, email, empNumber, role);
    return await this._userService.addUser(user);
  }

  async verifyUser(userName, email, empNumber) {
    let user = await this._userService.findUser(userName);
    if (user.hasOwnProperty("user_id")) {
      return user;
    } else {
      user = await this.addUser(userName, email, empNumber, 1);
      return user;
    }
  }

  async autAdmin(userName, password) {
    let user = await this._userService.autAdmin(userName, userName, password);
    return user.length;
  }

  async addComment(comment, worldType) {
    let user = await this._userService.addComment(comment, worldType);
    return user;
  }
}

module.exports = UserController;
