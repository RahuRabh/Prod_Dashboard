const express = require("express");
const router = express.Router();

const {
  getFactory,
  getWorkers,
  getWorkerById,
  getWorkstations,
  getWorkstationById,
} = require("../controllers/metrics.controller");

router.get("/factory", getFactory);

router.get("/workers", getWorkers);
router.get("/workers/:id", getWorkerById);

router.get("/workstations", getWorkstations);
router.get("/workstations/:id", getWorkstationById);

module.exports = router;
