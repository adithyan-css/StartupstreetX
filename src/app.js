require("dotenv").config();
const express = require("express");
const cors = require("cors");
const registrationRoutes = require("./routes/registration"); // must match path
require("./models/db"); // MongoDB connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("VIT Registration Backend is running 🚀"));

app.use("/api/registration", registrationRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
