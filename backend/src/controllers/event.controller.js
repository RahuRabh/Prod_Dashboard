const validateEvent = require("../utils/validateEvent");
const { processEvent } = require("../services/event.service");

const ingestEvent = (req, res) => {
  const event = req.body;

  //validation
  const error = validateEvent(event);

  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const result = processEvent(event);

    if (result.status === "duplicate") {
      return res.status(200).json({
        message: "Duplicate event ignored",
      });
    }

    return res.status(201).json({
      message: "Event stored successfully",
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  ingestEvent,
};
