var http = require("http");
var manejador = function(solicitud, respuesta) {
   console.log("Recibimos una nueva petición");
   respuesta.end("Hola Mundo");
};
var servidor = http.createServer(manejador);
servidor.listen(8085);

var mysql = require('mysql');
var con = mysql.createConnection({
   host: "localhost",
   user: "db_manager",
   password: "lRT0dhJS7hDUOVty"
 });
 
 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });