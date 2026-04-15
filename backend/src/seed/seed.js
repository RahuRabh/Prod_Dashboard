const db = require("../config/db");

const seedDB = () => {
  // Clear old data first
  db.prepare("DELETE FROM events").run();
  db.prepare("DELETE FROM workers").run();
  db.prepare("DELETE FROM workstations").run();

  // Seed workers
  const workerStmt = db.prepare(`
    INSERT INTO workers (id, name)
    VALUES (?, ?)
  `);

  for (let i = 1; i <= 6; i++) {
    workerStmt.run(`W${i}`, `Worker ${i}`);
  }

  // Seed workstations
  const workstationStmt = db.prepare(`
    INSERT INTO workstations (id, name)
    VALUES (?, ?)
  `);

  for (let i = 1; i <= 6; i++) {
    workstationStmt.run(`S${i}`, `Station ${i}`);
  }

  // Seed events
  const eventStmt = db.prepare(`
    INSERT INTO events 
    (timestamp, worker_id, workstation_id, event_type, confidence, count)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const baseTime = new Date("2026-01-15T10:00:00Z");

  const workerProfiles = {
    W1: { firstWork: 15, idle: 5, secondWork: 25, units1: 8, units2: 14 },
    W2: { firstWork: 10, idle: 15, secondWork: 15, units1: 5, units2: 9 },
    W3: { firstWork: 8, idle: 20, secondWork: 10, units1: 3, units2: 6 },
    W4: { firstWork: 5, idle: 25, secondWork: 5, units1: 2, units2: 3 },
    W5: { firstWork: 20, idle: 5, secondWork: 20, units1: 7, units2: 11 },
    W6: { firstWork: 12, idle: 10, secondWork: 18, units1: 5, units2: 10 },
  };

  Object.entries(workerProfiles).forEach(([workerId, profile]) => {
    const stationId = workerId.replace("W", "S");
    let currentTime = new Date(baseTime);

    // Working starts
    eventStmt.run(
      currentTime.toISOString(),
      workerId,
      stationId,
      "working",
      0.95,
      null
    );

    // First productive block
    currentTime.setMinutes(currentTime.getMinutes() + profile.firstWork);
    eventStmt.run(
      currentTime.toISOString(),
      workerId,
      stationId,
      "product_count",
      0.98,
      profile.units1
    );

    // Idle starts
    currentTime.setMinutes(currentTime.getMinutes() + 1);
    eventStmt.run(
      currentTime.toISOString(),
      workerId,
      stationId,
      "idle",
      0.92,
      null
    );

    // Back to working
    currentTime.setMinutes(currentTime.getMinutes() + profile.idle);
    eventStmt.run(
      currentTime.toISOString(),
      workerId,
      stationId,
      "working",
      0.96,
      null
    );

    // Second productive block
    currentTime.setMinutes(currentTime.getMinutes() + profile.secondWork);
    eventStmt.run(
      currentTime.toISOString(),
      workerId,
      stationId,
      "product_count",
      0.99,
      profile.units2
    );

    // Absent
    currentTime.setMinutes(currentTime.getMinutes() + 5);
    eventStmt.run(
      currentTime.toISOString(),
      workerId,
      stationId,
      "absent",
      0.9,
      null
    );
  });

  console.log("🌱 Database seeded successfully");
};

module.exports = seedDB;