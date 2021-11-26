const express = require("express");
const router = express.Router();
const SampleModel = require("../models/sampleModel");

//CREATE AN ITEM
router.post("/", async (req, res) => {
  const sample = new SampleModel({
    title: req.body.title,
  });
  try {
    const savedItem = await sample.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const samples = await SampleModel.find();
    res.json(samples);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET A SINGLE ITEM
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sample = await SampleModel.findById(id);
    res.json(sample);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPATE A SINGLE ITEM
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const removedItem = await SampleModel.remove({ _id: id });
    res.json(removedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE A SINGLE ITEM
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedItem = await SampleModel.updateOne(
      { _id: id },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
    res.json(updatedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
