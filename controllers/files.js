import { Folders } from "../models/folders.js";

export const createFile = async (req, res) => {
  try {
    const { fid, fname, scode, lang } = req.body;
    const folder = await Folders.findById(fid);
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found...",
      });
    }
    var filecontent = { filename: fname, sourceCode: scode, lang: lang };
    await Folders.updateOne({ _id: fid }, { $push: { files: filecontent } });
    res.status(200).json({
      success: true,
      message: "file created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const folder = await Folders.findOne({ "files._id": fileId });
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found...",
      });
    }
    folder.files.id(fileId).remove();
    await folder.save();
    res.status(200).json({
      success: true,
      message: "File Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
