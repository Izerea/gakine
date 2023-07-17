import Playground from "../models/Playground.js";
import Court from "../models/Court.js";

export const createPlayground = async (req, res, next) => {
  const newPlayground = new Playground(req.body);

  try {
    const savedPlayground = await newPlayground.save();
    res.status(200).json(savedPlayground);
  } catch (err) {
    next(err);
  }
};
export const updatePlayground = async (req, res, next) => {
  try {
    const updatedPlayground = await Playground.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPlayground);
  } catch (err) {
    next(err);
  }
};
export const deletePlayground = async (req, res, next) => {
  try {
    await Playground.findByIdAndDelete(req.params.id);
    res.status(200).json("Playground has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getPlayground = async (req, res, next) => {
  try {
    const playground = await Playground.findById(req.params.id);
    res.status(200).json(playground);
  } catch (err) {
    next(err);
  }
};
export const getPlaygrounds = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const playgrounds = await Playground.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(playgrounds);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Playground.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (_req, res, next) => {
  try {
    const playgroundCount = await Playground.countDocuments({ type: "playground" });
    const stadiumCount = await Playground.countDocuments({ type: "stadium" });
    const hallCount = await Playground.countDocuments({ type: "hall" });
    const organizationCount = await Playground.countDocuments({ type: "organization" });
    const personalCount = await Playground.countDocuments({ type: "personal" });

    res.status(200).json([
      { type: "playground", count: playgroundCount },
      { type: "stadiums", count: stadiumCount },
      { type: "halls", count: hallCount },
      { type: "organizations", count: organizationCount },
      { type: "personals", count: personalCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getPlaygroundCourts = async (req, res, next) => {
  try {
    const playground = await Playground.findById(req.params.id);
    const list = await Promise.all(
        playground.courts.map((court) => {
        return Court.findById(court);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
