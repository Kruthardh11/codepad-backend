import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import editorRoute from "./routes/editor.js";
import folderRoute from "./routes/folder.js";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
const app = express();

export default app;
dotenv.config({
  path: "./config/config.env",
});
// Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(cookieParser());

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use(cors())
//session ke baad hm app.use(passport krenge)
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

//COnfig connect hone ke baad call krna hai hme connectPassport
connectPassport();
//importing routes

app.use(userRoute);
app.use(editorRoute);
app.use(folderRoute);
//we have to import errorMiddleware at the end
app.use(errorMiddleware);
