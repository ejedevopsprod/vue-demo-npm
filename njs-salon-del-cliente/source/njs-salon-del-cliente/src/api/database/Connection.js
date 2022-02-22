const DBConfig = require("../../config/DBConfig.json");

const mysql = require("mysql");

const mysqlConnection = mysql.createPool({
  connectionLimit: 5,
  ...DBConfig,
});

//mysql.createConnection(DBConfig);
/* mysqlConnection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("connection ok");
  }
}); */

module.exports = mysqlConnection;
