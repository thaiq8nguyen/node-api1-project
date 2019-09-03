const express = require("express");
const morgan = require("morgan");
//const bodyParser = require("body-parser")
const usersRouter = require("./routes/users");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", usersRouter);

app.listen(5000, () => {
  console.log("--server is listening on port 5000");
});
