-- workers
CREATE TABLE IF NOT EXISTS workers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- workstations
CREATE TABLE IF NOT EXISTS workstations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- events
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  worker_id TEXT,
  workstation_id TEXT,
  event_type TEXT NOT NULL,
  confidence REAL,
  count INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES workers(id),
  FOREIGN KEY (workstation_id) REFERENCES workstations(id)
);

-- index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_worker_time
ON events(worker_id, timestamp);