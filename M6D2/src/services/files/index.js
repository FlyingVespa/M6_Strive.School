import express from "express";
import multer from "multer";
import createError from "http-errors";
import { writeUsersPicture } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

// 1. SINGLE UPLOAD

filesRouter.post(
  "/upload",
  multer({
    fileFilter: (req, file, multerNext) => {
      if (file.mimetype !== "image/gif") {
        return multerNext(createError(400, "Only GIF allowed!"));
      } else {
        return multerNext(null, true);
      }
    },
  }).single("avatar"),
  async (req, res, next) => {
    try {
      console.log(req.file);

      await writeUsersPicture(req.file.originalname, req.file.buffer);
      res.send("Img uploaded!");
    } catch (error) {
      next(error);
    }
  }
);

// 2. MULTIPLE UPLOAD

filesRouter.post(
  "/uploadMultiple",
  multer().array("avatar", 2),
  async (req, res, next) => {
    try {
      console.log("REQ. FILE: ", req.file);
      console.log("REQ. FILES: ", req.files);

      const arrayOfPromises = req.files.map((file) =>
        writeUsersPicture(file.originalname, file.buffer)
      );

      await Promise.all(arrayOfPromises);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
