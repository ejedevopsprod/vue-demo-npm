const DBConfig = require("../../config/DBConfig.json");
const mysql = require("mysql");

const mysqlConnection = mysql.createConnection(DBConfig);

mysqlConnection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("connection ok");
  }
});

module.exports = mysqlConnection;
