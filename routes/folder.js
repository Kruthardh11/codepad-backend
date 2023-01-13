import express from "express";
import { createFile } from "../controllers/files.js";
import {
  createFolder,
  deleteFolder,
  showfolders,
} from "../controllers/folders.js";
import { deleteFile } from "../controllers/files.js";
import { showAllFolders } from "../controllers/user.js";

const router = express.Router();

router.post("/folder", createFolder);
router.delete("/folder/:id", deleteFolder);
router.delete("/file/:id", deleteFile);
router.post("/file", createFile);
router.get("/all", showfolders);
router.get("/myfolders", showAllFolders);
export default router;
