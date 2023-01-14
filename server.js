import express from "express";
import bodyParser from "body-parser";
import app from "./app.js";
import { connectDB } from "./config/database.js";
import cors from "cors";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.json());

connectDB();
app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Working",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is working on port: ${process.env.PORT}`);
});
