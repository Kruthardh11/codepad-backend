import express, { urlencoded } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import editorRoute from "./routes/editor.js";
import folderRoute from "./routes/folder.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
const app = express();

export default app;
dotenv.config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(cookieParser());

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Working",
  });
  next();
});

//importing routes
app.use(userRoute);
app.use(editorRoute);
app.use(folderRoute);

//we have to import errorMiddleware at the end
app.use(errorMiddleware);
