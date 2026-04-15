# 🤖 AI-Powered Worker Productivity Dashboard

## A high-performance monitoring system that transforms AI CCTV event streams into actionable manufacturing intelligence.

## 🚀 Overview
This system simulates an end-to-end computer vision pipeline. It ingests structured events (like state changes and product counts), processes them through a custom metrics engine, and visualizes factory-floor productivity in real-time.

## 🏗️ Architecture
Data Pipeline
mermaid
graph LR
  A[AI CCTV Cameras] --> B[Event Stream]
  B --> C[Node.js Backend]
  C --> D[(SQLite DB)]
  D --> E[Metrics Engine]
  E --> F[React Dashboard]
Use code with caution.
Flow Logic
Edge: Computer vision system emits structured JSON events.
Ingest: Backend receives events via POST /events and validates schema.
Storage: Events are persisted in SQLite with duplicate detection.
Compute: Metrics engine calculates utilization and throughput on-the-fly.
View: Dashboard renders worker, workstation, and factory-wide summaries.

## 📊 Metrics Definitions
Metric	Calculation	Description
Active Time	Σ(duration in 'working' state)	Total time spent producing.
Utilization %	Active Time / (Active + Idle)	Efficiency of the worker's shift.
Throughput	Total Units / Active Time	Units produced per hour of work.
Occupancy	Working + Idle Time	Total time a station was engaged.
🗄️ Database Schema
workers & workstations
Basic metadata including id and name.
events
Column	Type	Description
timestamp	DATETIME	ISO-8601 event time.
worker_id	FK	Reference to worker.
event_type	TEXT	working, idle, absent, product_count.
confidence	FLOAT	AI model's prediction score.
count	INT	Units produced (only for product_count).

## 🛡️ Edge Cases & AI Strategy
Handling Data Integrity
Duplicate Events: Filtered using a unique composite key: (worker_id, timestamp, event_type).
Out-of-Order Data: The engine re-sorts the timeline by timestamp before every computation.
Connectivity Gaps: Late-arriving events are seamlessly integrated into historical metrics.
MLOps & Model Drift
To maintain accuracy in production, we monitor:
Drift Signals: Sudden drops in confidence or historical production mismatches.
Retraining Trigger: Triggered by high false-positive rates or manual supervisor feedback.
Pipeline: Flagged Events → Human Labeling → Retrain → Redeploy.

## 📈 Scaling Strategy
Phase 1 (1-5 Cameras): Single Node.js instance + SQLite (Current).
Phase 2 (100+ Cameras): PostgreSQL + Kafka/RabbitMQ + Redis Caching.
Phase 3 (Multi-Site): Multi-tenant architecture with regional ingestion services.

💻 Running Locally
Option 1: Manual Setup
bash
# 1. Setup Backend
cd backend
npm install
npm run dev

# 2. Setup Frontend
cd frontend
npm install
npm run dev
Use code with caution.

Option 2: Docker
bash
docker compose up --build
Use code with caution.
