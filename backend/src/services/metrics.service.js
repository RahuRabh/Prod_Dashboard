const db = require("../config/db");

const getWorkerEvents = (workerId) => {
  const stmt = db.prepare(`
        SELECT * FROM events
        WHERE worker_id = ?
        ORDER BY timestamp ASC
        `);

  return stmt.all(workerId);
};

const computeWorkerMetrics = (events) => {
  let activeTime = 0;
  let idleTime = 0;
  let totalUnits = 0;

  let currentState = null;

  for (let i = 0; i < events.length; i++) {
    const curr = events[i];

    // count production first
    if (curr.event_type === "product_count") {
      totalUnits += curr.count || 0;
    }

    // update state only if state event
    if (["working", "idle", "absent"].includes(curr.event_type)) {
      currentState = curr.event_type;
    }

    // last event -> no duration
    if (i === events.length - 1) break;

    const next = events[i + 1];

    const currTime = new Date(curr.timestamp);
    const nextTime = new Date(next.timestamp);

    const duration = (nextTime - currTime) / 1000; // duration in seconds

    // assign duration based on state
    if (currentState === "working") {
      activeTime += duration;
    } else if (currentState === "idle") {
      idleTime += duration;
    }
  }

  const totalTime = activeTime + idleTime;

  const utilization = totalTime ? (activeTime / totalTime) * 100 : 0;

  const unitsPerHour = activeTime ? (totalUnits / activeTime) * 3600 : 0;

  return {
    activeTime,
    idleTime,
    totalTime,
    totalUnits,
    utilization,
    unitsPerHour,
  };
};

const getWorkerMetrics = (workerId) => {
  const events = getWorkerEvents(workerId);

  if (!events.length) return null;

  return computeWorkerMetrics(events);
};

const getAllWorkerMetrics = () => {
  const workers = db.prepare("SELECT * FROM workers").all();

  return workers.map((worker) => {
    const metrics = getWorkerMetrics(worker.id);

    return {
      workerId: worker.id,
      name: worker.name,
      ...metrics,
    };
  });
};

const getFactoryMetrics = () => {
  const workers = getAllWorkerMetrics();

  let totalProduction = 0;
  let totalActive = 0;
  let totalIdle = 0;

  workers.forEach((w) => {
    totalProduction += w.totalUnits || 0;
    totalActive += w.activeTime || 0;
    totalIdle += w.idleTime || 0;
  });

  const totalTime = totalActive + totalIdle;

  const avgUtilization = workers.length
    ? workers.reduce((sum, w) => sum + (w.utilization || 0), 0) / workers.length
    : 0;

  const avgProductionRate = totalActive
    ? (totalProduction / totalActive) * 3600
    : 0;

  return {
    totalProduction,
    totalActive,
    totalIdle,
    avgUtilization,
    avgProductionRate,
  };
};

const getWorkstationEvents = (stationId) => {
  const stmt = db.prepare(`
        SELECT * FROM events
        WHERE workstation_id = ?
        ORDER BY timestamp ASC
        `);

  return stmt.all(stationId);
};

const computeWorkstationMetrics = (events) => {
  let occupancyTime = 0;
  let productiveTime = 0;
  let totalUnits = 0;

  let currentState = null;

  for (let i = 0; i < events.length; i++) {
    const curr = events[i];

    if (curr.event_type === "product_count") {
      totalUnits += curr.count || 0;
    }

    if (["working", "idle", "absent"].includes(curr.event_type)) {
      currentState = curr.event_type;
    }

    if (i === events.length - 1) break;

    const next = events[i + 1];

    const duration =
      (new Date(next.timestamp) - new Date(curr.timestamp)) / 1000;

    // station occupied whenever worker is present
    if (currentState === "working" || currentState === "idle") {
      occupancyTime += duration;
    }

    if (currentState === "working") {
      productiveTime += duration;
    }
  }

  const utilization = occupancyTime
    ? (productiveTime / occupancyTime) * 100
    : 0;

  const throughputRate = productiveTime
    ? (totalUnits / productiveTime) * 3600
    : 0;

  return {
    occupancyTime,
    productiveTime,
    totalUnits,
    utilization,
    throughputRate,
  };
};

const getWorkstationMetrics = (stationId) => {
  const events = getWorkstationEvents(stationId);

  if (!events.length) return null;

  return computeWorkstationMetrics(events);
};

const getAllWorkstationMetrics = () => {
  const stations = db.prepare("SELECT * FROM workstations").all();

  return stations.map((station) => {
    const metrics = getWorkstationMetrics(station.id);

    return {
      workstationId: station.id,
      name: station.name,
      ...metrics,
    };
  });
};

module.exports = {
  getWorkerMetrics,
  getAllWorkerMetrics,
  getFactoryMetrics,
  getWorkstationEvents,
  computeWorkstationMetrics,
  getWorkstationMetrics,
  getAllWorkstationMetrics,
};
  