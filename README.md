# AI-Powered Worker Productivity Dashboard

This project simulates a manufacturing monitoring system powered by AI-enabled CCTV cameras and computer vision.

The computer vision layer generates structured activity events for workers and workstations. These events are ingested by the backend, stored in a database, converted into productivity metrics, and displayed through an interactive dashboard.

The dashboard helps factory supervisors answer questions such as:

- Which workers are productive?
- Which workstations are under-utilized?
- How much output is the factory generating?
- Where are there delays, idle time, or absence?

### System Architecture
AI CCTV Cameras + Computer Vision -> Structured Events -> Node.js + Express API -> SQLite Database -> Metrics Engine -> React Dashboard

### Edge → Backend → Dashboard Flow

The computer vision system emits structured events such as:
```{
  "timestamp": "2026-01-15T10:15:00Z",
  "worker_id": "W1",
  "workstation_id": "S3",
  "event_type": "working",
  "confidence": 0.93
}
```
The backend receives these events through the ingestion API. Events are stored in SQLite as the source of truth.

### A metrics engine computes:
- Worker productivity
- Workstation utilization
- Factory-level performance

### The frontend dashboard displays:
- Summary cards
- Worker table
- Workstation table
- Detail side panels


### Running the Project
> Local Development

Backend
```
cd backend
npm install
npm run dev

Backend runs on:
http://localhost:3000
```
Frontend
```cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173
```

> Docker
```
docker compose up --build
```

### Handling Real-World Issues
>Intermittent Connectivity

```
In a real environment, CCTV devices or network connections may temporarily fail, causing events to arrive late.

To handle this:
> The backend stores all events permanently.
> Metrics are computed dynamically from the stored event history.
> Late-arriving events are accepted and included automatically the next time metrics are calculated.

This ensures the dashboard eventually becomes consistent even if some events arrive after a delay.
```

> Duplicate Events

```
Sometimes the same event may be sent multiple times because of retries or unstable connectivity.

To avoid double-counting:
The backend checks whether an event with the same:
> worker_id
> timestamp
> event_type

If the event already exists, it is ignored.

This prevents:
> Duplicate production counts
> Inflated utilization
> Incorrect time calculations
```
> Out-of-Order Timestamps

```
- same way as we would treat Duplicate events
```



Future Improvements for AI Models
> Model Versioning
```
As the computer vision model evolves, different model versions may generate slightly different outputs.
To track this, I would add these fields to every event:

> model_version
> camera_id
> site_id

This would make it possible to:
> Compare different model versions
> Identify when a newer model caused a change in behavior
> Roll back if needed

```

> Detecting Model Drift
```
Model drift happens when the AI system becomes less accurate over time because factory conditions change.

Examples:
Lighting changes, Camera angle changes, New worker uniforms, Different workstation layout

Possible signs of drift:
> Confidence scores suddenly decrease
> Idle or absent detections increase unexpectedly
> Production output no longer matches actual output

A production system would monitor:
> Average confidence score
> Utilization trends
> Mismatch between predicted and actual production

If those metrics cross a threshold, the system would flag possible model drift.
```

> Triggering Retraining
```
Retraining should happen when:

> Model drift is detected
> False positives increase
> Supervisors report incorrect detections

Suggested retraining pipeline:
> Flagged Events -> Human Review -> Corrected Labels -> Retrain Model -> Deploy New Model Version

This creates a feedback loop where the system continuously improves over time.
```

> Scaling Strategy
```
To support 100+ cameras, I would:

At larger scale, SQLite and a single backend become a bottleneck.

> Replace SQLite with PostgreSQL
> Use Kafka or RabbitMQ for event ingestion
> Process events asynchronously in background workers
> Cache computed metrics in Redis

Updated architecture:
Cameras → Message Queue → Processing Service → Database → Dashboard

For multiple factories across locations:
> Add site_id to all events
> Store data for each site separately
> Introduce multi-tenant architecture
> Deploy regional ingestion services near each site

All sites would feed into a central dashboard where management could compare performance across factories.
```


