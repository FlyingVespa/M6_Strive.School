import { writeFile } from "fs";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { dirname, join, extname } from "path";
import { dir } from "console";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PORT);
const { PORT } = process.env;
const { readJSON, writeJSON } = fs;

// File Paths
export const getDataFilePath = (fileName) =>
  join(dirname(fileURLToPath(import.meta.url)), "../jsondata/", fileName);

//  JSON PARSED ARRAYS
export const readFile = async (fileName) => {
  const test = getDataFilePath(fileName);
  const jsonfile = await fs.readJSON(test);
  return jsonfile;
};

// Write to files
export const writeToFile = async (filename, content) => {
  await fs.writeFileSync(getDataFilePath(filename), JSON.stringify(content));
};

export const convertFile = multer();

export const uploadFile = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    fs.writeFileSync(path.join(getDataFilePath, fileName), buffer);
    req.file = `http://localhost:${PORT}/${fileName}`;
    next();
  } catch (error) {
    next(error);
  }
};
