const express = require("express");
const router = express.Router();

router.get("/health", async (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };
  try {
    await res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
