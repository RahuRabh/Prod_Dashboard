const express = require("express");
const router = express.Router();

const { ingestEvent } = require("../controllers/event.controller");

router.post("/", ingestEvent);

module.exports = router;
