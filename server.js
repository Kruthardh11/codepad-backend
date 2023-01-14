import app from "./app.js";
import { connectDB } from "./config/database.js";

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
