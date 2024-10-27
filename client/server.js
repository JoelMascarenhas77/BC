const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const api = require("./block_api");
const auth = require("./auth");
const record = require("./record");
const app = express();
const port = 3000;
const staticDir = path.join(__dirname, "public");
const cookieParser = require("cookie-parser");

app.use(express.static(staticDir));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api", api);
app.use("/record", record);
app.use(auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
