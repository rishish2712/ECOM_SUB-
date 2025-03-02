const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/", (req,res) => {
    res.json({message : "Server Response"});
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});