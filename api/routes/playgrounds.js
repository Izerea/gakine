import express from "express";
import {
  countByCity,
  countByType,
  createPlayground,
  deletePlayground,
  getPlayground,
  getPlaygroundCourts,
  getPlaygrounds,
  updatePlayground,
} from "../controllers/playground.js";
import Playground from "../models/Playground.js";
import {verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPlayground);

//UPDATE
router.put("/:id", verifyAdmin, updatePlayground);
//DELETE
router.delete("/:id", verifyAdmin, deletePlayground);
//GET

router.get("/find/:id", getPlayground);
//GET ALL

router.get("/", getPlaygrounds);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/court/:id", getPlaygroundCourts);

export default router;