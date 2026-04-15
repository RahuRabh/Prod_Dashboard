const express = require("express");
const router = express.Router();

const seedDB = require("../seed/seed");

router.post("/", (req, res) => {
  try {
    seedDB();
    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

module.exports = router;
