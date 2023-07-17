import Court from "../models/Court.js";
import Playground from "../models/Playground.js";
import { createError } from "../utils/error.js";

export const createCourt = async (req, res, next) => {
  const playgroundId = req.params.playgroundid;
  const newCourt = new Court(req.body);

  try {
    const savedCourt = await newCourt.save();
    try {
      await Playground.findByIdAndUpdate(playgroundId, {
        $push: { courts: savedCourt._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedCourt);
  } catch (err) {
    next(err);
  }
};

export const updateCourt = async (req, res, next) => {
  try {
    const updatedCourt = await Court.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCourt);
  } catch (err) {
    next(err);
  }
};
export const updateCourtAvailability = async (req, res, next) => {
  try {
    await Court.updateOne(
      { "courtNumbers._id": req.params.id },
      {
        $push: {
          "courtNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Court status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteCourt = async (req, res, next) => {
  const playgroundId = req.params.playgroundid;
  try {
    await Court.findByIdAndDelete(req.params.id);
    try {
      await Playground.findByIdAndUpdate(playgroundId, {
        $pull: { courts: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Court has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCourt = async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id);
    res.status(200).json(court);
  } catch (err) {
    next(err);
  }
};
export const getCourts = async (req, res, next) => {
  try {
    const courts = await Court.find();
    res.status(200).json(courts);
  } catch (err) {
    next(err);
  }
};
