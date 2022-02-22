class WorldService {
  constructor() {
    //this._game = new Game(new Player())
  }

  setScore(userName, worldType, score, time) {
    //this._game.Worlds[worldIndex].Score = score
    //this._game.Worlds[worldIndex].Time = time

    //set the score and time of the user world in the db
    //querySetScore(userId, this._game.Worlds[worldIndex])
    //querySetScore(userId, worldIndex, score, time)
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE worlds w 
        JOIN players p ON w.player_id = p.player_id 
        JOIN users u ON p.user_id = u.user_id
        SET w.score = ${score}, w.time = ${time} 
        WHERE u.user_name = '${userName}' AND w.type = ${worldType}`,
        (error, results) => {
          if (error) throw error;
          resolve(JSON.parse(JSON.stringify(results)));
        }
      );
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT type, score, time, active FROM worlds w 
          JOIN players p ON w.player_id = p.player_id 
          JOIN users u ON p.user_id = u.user_id 
          WHERE u.user_name = '${userName}' AND w.type = '${worldType}'`,
          (error, results) => {
            if (error) throw error;
            resolve(results);
          }
        );
      });
    });
  }

  setStatus(userName, worldType, active) {
    //set the status of the user world in the db
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE worlds w 
        JOIN players p ON w.player_id = p.player_id 
        JOIN users u ON p.user_id = u.user_id
        SET w.active = ${active}
        WHERE u.user_name = '${userName}' AND w.type = ${worldType}`,
        (error, results) => {
          if (error) throw error;
          resolve(results);
        }
      );
    }).then(() => {
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT type, score, time, active FROM worlds w 
          JOIN players p ON w.player_id = p.player_id 
          JOIN users u ON p.user_id = u.user_id 
          WHERE u.user_name = '${userName}' AND w.type = '${worldType}'`,
          (error, results) => {
            if (error) throw error;
            resolve(results);
          }
        );
      });
    });
  }

  getUserWorlds(userName) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT w.type, w.score, w.time, w.active FROM worlds AS w 
          JOIN players AS p ON w.player_id = p.player_id JOIN users AS u ON u.user_id = p.user_id 
          WHERE u.user_name = '${userName}' ORDER BY w.type`,
        (error, results) => {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}

module.exports = WorldService;
