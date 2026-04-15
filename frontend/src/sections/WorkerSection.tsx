import WorkerTable from "../components/WorkerTable";
import type { WorkerMetric } from "../types/metrics";

interface WorkerSectionProps {
  workers: WorkerMetric[];
  handleSelectWorker: (workerId: string) => void;
}

function WorkerSection({
  workers,
  handleSelectWorker,
}: WorkerSectionProps) {
  return (
    <>
      {workers.length > 0 ? (
        <WorkerTable workers={workers} onSelectWorker={handleSelectWorker} />
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-10 text-center text-slate-500">
          No worker data available for the selected filter.
        </div>
      )}
    </>
  );
}

export default WorkerSection;
