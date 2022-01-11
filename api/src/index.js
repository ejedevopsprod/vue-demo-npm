//const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//settings
app.set("port", process.env.PORT || 8080);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes
app.use(express.static(__dirname + "/build"));
app.use("/profuturo", express.static(__dirname + "/build"));
app.use("/profuturo/login", express.static(__dirname + "/build"));
app.use("/profuturo/admin", express.static(__dirname + "/build"));
app.use("/profuturo/admin/login", express.static(__dirname + "/build"));
app.use("/api/users", require("../src/api/routes/Users"));
app.use("/api/worlds", require("../src/api/routes/Worlds"));

//starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
