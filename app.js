import express, { application, urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import editorRoute from "./routes/editor.js";
import folderRoute from "./routes/folder.js";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
dotenv.config({
  path: "./config/config.env",
});
const app = express();

export default app;

//Using Middlewares
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
//session ke baad hm app.use(passport krenge)
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//COnfig connect hone ke baad call krna hai hme connectPassport
connectPassport();
//importing routes

app.use(userRoute);
app.use(editorRoute);
app.use(folderRoute);
//we have to import errorMiddleware at the end
app.use(errorMiddleware);
