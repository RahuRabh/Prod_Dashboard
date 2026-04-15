const {
  getAllWorkerMetrics,
  getFactoryMetrics,
  getAllWorkstationMetrics,
  getWorkerMetrics,
  getWorkstationMetrics,
} = require("../services/metrics.service");

const getWorkers = (req, res) => {
  const data = getAllWorkerMetrics();
  res.json(data);
};

const getFactory = (req, res) => {
  const data = getFactoryMetrics();
  res.json(data);
};

const getWorkerById = (req, res) => {
  const { id } = req.params;

  const metrics = getWorkerMetrics(id);

  if (!metrics) {
    return res.status(404).json({ error: "Worker not found" });
  }

  res.json({ workerId: id, ...metrics });
};

const getWorkstations = (req, res) => {
  const data = getAllWorkstationMetrics();
  res.json(data);
};

const getWorkstationById = (req, res) => {
  const { id } = req.params;

  const metrics = getWorkstationMetrics(id);

  if (!metrics) {
    return res.status(404).json({ error: "Workstation not found" });
  }

  res.json({ workstationId: id, ...metrics });
};

module.exports = {
  getWorkers,
  getFactory,
  getWorkerById,
  getWorkstations,
  getWorkstationById,
};
