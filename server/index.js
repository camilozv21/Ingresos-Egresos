const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./database/config/db");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", require("./database/routes/movementsRoutes"));

app.listen(port, console.log(`Server is running on http://localhost:${port}`.magenta.bold));
