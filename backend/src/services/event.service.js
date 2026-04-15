const db = require("../config/db");

//check duplicate
const isDuplicate = (event) => {
  const stmt = db.prepare(`
        SELECT id FROM events
        WHERE worker_id = ?
        AND timestamp = ?
        AND event_type = ?
        `);

  const existing = stmt.get(event.worker_id, event.timestamp, event.event_type);

  return !!existing;
};

const insertEvent = (event) => {
  const stmt = db.prepare(`
        INSERT INTO events 
    (timestamp, worker_id, workstation_id, event_type, confidence, count)
        VALUES (?, ?, ?, ?, ?, ?)
        `);
  stmt.run(
    event.timestamp,
    event.worker_id,
    event.workstation_id,
    event.event_type,
    event.confidence,
    event.count,
  );
};

const processEvent = (event) => {
  if (isDuplicate(event)) {
    return { status: "duplicate" };
  }
  insertEvent(event);

  return { status: "success" };
};

module.exports = {
  processEvent,
};
