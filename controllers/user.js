import { Folders } from "../models/folders.js";

export const myProfile = (req, res, next) => {
  // if (!req.user) {
  //   return res.status(200).json({
  //     success: false,
  //     message: "Please login first",
  //   });
  // }
  res.status(200).json({
    success: true,
    //passport js gives us user in the request.user
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    res.status(200).json({
      message: "Logged Out",
    });
  });
};
export const showAllFolders = async (req, res, next) => {
  try {
    // const user = req.user._id;
    const user = "63c1c876b4de6a5313ba9bbd";
    const use = await Folders.find(
      { user: user },
      { _id: 0, name: 1, files: 1 }
    );
    res.status(200).json({
      success: true,
      use,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
