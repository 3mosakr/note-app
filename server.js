// setup server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const noteRouter = require("./app/routes/note.routes");
let app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server is started..........");
});

app.use("/api/v1", noteRouter);

app.listen(3000, () => {
  console.log("server started in bort 3000 ...");
});
