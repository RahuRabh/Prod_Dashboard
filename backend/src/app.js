const express = require("express");
const cors = require("cors");
const seedRoutes = require("./routes/seed.routes");
const eventRoutes = require("./routes/event.routes");
const metricsRoutes = require("./routes/metrics.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/seed", seedRoutes);
app.use("/events", eventRoutes);
app.use("/metrics", metricsRoutes);

module.exports = app;
