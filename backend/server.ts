const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/", (_req: any, res: { json: (arg0: { message: string; }) => void; }) => {
    res.json({ message: "Server Response" });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});