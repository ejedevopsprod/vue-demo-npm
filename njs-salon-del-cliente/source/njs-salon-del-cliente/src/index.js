//const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

//settings
app.set("port", process.env.PORT || 8080);

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes
app.use("/api/users", require("../src/api/routes/Users"));
app.use("/api/worlds", require("../src/api/routes/Worlds"));

//starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
