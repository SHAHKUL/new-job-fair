require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const signinRoutes = require("./routes/signin");
const LoginRoute = require("./routes/login");
const HomeRoute = require("./routes/home");
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL);
 
app.get("/", (req, res) => {
  res.send("getting the data");
});


app.use("/signin", signinRoutes);
app.use("/login", LoginRoute);
app.use("/home", HomeRoute);

app.listen(process.env.PORT, (req, res) => {
  console.log("server connected");
});
