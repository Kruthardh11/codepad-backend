import express from "express";
import { Folders } from "../models/folders.js";
export const createFolder = async (req, res, next) => {
  try {
    const { folderName } = req.body;
    //passportjs hme user de deta hai req.user me
    // const user = "req.user._id;"
    const user = "63c1c876b4de6a5313ba9bbd";
    await Folders.create({ name: folderName, user: user });
    res.status(201).json({
      success: true,
      message: "Folder Created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFolder = async (req, res, next) => {
  try {
    const folder = await Folders.findById(req.params.id);
    if (!folder) {
      return res.status(500).json({
        success: "false",
        message: "Folder not found",
      });
    }
    await folder.remove();
    res.status(200).json({
      success: true,
      message: "Folder Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const showfolders = async (req, res, next) => {
  try {
    const folders = await Folders.find();
    res.status(200).json({
      success: true,
      folders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
