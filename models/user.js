import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
  photo: String,
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  folders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folders",
  },
});

export const User = mongoose.model("User", schema);
