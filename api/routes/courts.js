import express from "express";
import {
  createCourt,
  deleteCourt,
  getCourt,
  getCourts,
  updateCourt,
  updateCourtAvailability,
} from "../controllers/court.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:playgroundid", verifyAdmin, createCourt);

//UPDATE
router.put("/availability/:id", updateCourtAvailability);
router.put("/:id", verifyAdmin, updateCourt);
//DELETE
router.delete("/:id/:playgroundid", verifyAdmin, deleteCourt);
//GET

router.get("/:id", getCourt);
//GET ALL

router.get("/", getCourts);

export default router;
