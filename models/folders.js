import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  files: [
    {
      filename: { type: String, required: true },
      sourceCode: String,
      lang: String,
    },
  ],
});
export const Folders = mongoose.model("Folders", folderSchema);
