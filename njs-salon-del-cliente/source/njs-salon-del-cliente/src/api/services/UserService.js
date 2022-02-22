//const User = require("./user");
const playersJSON = require("../../sampleData/players.json");
connection = require("../database/Connection.js");

class UserService {
  constructor() { }

  get Players() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT u.user_name, u.email, u.emp_number, p.total_score FROM players AS p JOIN users AS u ON u.user_id = p.user_id ORDER BY p.total_score LIMIT 10",
        (error, results) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  findUser(userName) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id FROM users WHERE user_name = '${userName}' LIMIT 1`,
        (error, results) => {
          if (error) reject(error);
          let user =
            results instanceof Array && results.length ? results[0] : results;
          resolve(user);
        }
      );
    });

    //get db players
    //return playersJSON[0];
  }

  findPlayer(aut_key) {
    //get db players
    return playersJSON[0];
  }

  autAdmin(userName, password) {
    return [{}];
  }

  addComment(userName, comment, worldType) {
    return [{}];
  }

  validateAdminPermissions(userName) {
    //check if the user is an admin in the db
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id FROM users WHERE user_name = '${userName}' AND role = 0 LIMIT 1`,
        (error, results) => {
          if (error) throw error;
          resolve(!!results.length);
        }
      );
    });
  }

  addUser(user) {
    return new Promise((resolve, reject) => {
      let { UserName, Email, EmpNumber, Role } = user;
      connection.query(
        `INSERT INTO users (user_name, email, emp_number, role) VALUES (?, ?, ?, ?)`,
        [UserName, Email, EmpNumber, Role],
        (error, results) => {
          if (error) reject(error);
          resolve(JSON.parse(JSON.stringify(results)));
        }
      );
    })
      .then((results) => {
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO players(user_id) VALUES(${results.insertId})`,
            (error, results) => {
              if (error) throw error;
              resolve(JSON.parse(JSON.stringify(results)));
            }
          );
        });
      })
      .then((results) => {
        let promises = [];
        for (let i = 0; i < 6; i++) {
          promises.push(
            new Promise((resolve, reject) => {
              connection.query(
                `INSERT INTO worlds(player_id, type, active) 
                VALUES(${results.insertId}, ${i}, ${!i})`,
                (error, results) => {
                  if (error) throw error;
                  resolve(results);
                }
              );
            })
          );
        }
        return Promise.all(promises).then((results) => results);
      })
      .then((results) => this.findUser(user.UserName));
  }
}

module.exports = UserService;
