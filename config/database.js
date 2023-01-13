import mongoose from "mongoose";
//connecting Mongoose database
export const connectDB = async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};
