const express = require("express");
const User = require("../server/routes/users");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", User);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});