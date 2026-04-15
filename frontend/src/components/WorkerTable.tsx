import { type WorkerMetric } from "../types/metrics";

interface WorkerTableProps {
  workers: WorkerMetric[];
  onSelectWorker: (workerId: string) => void;
}

function getUtilizationStyles(utilization: number) {
  if (utilization >= 80) {
    return {
      badge: "bg-green-100 text-green-700",
      bar: "bg-green-500",
    };
  }

  if (utilization >= 50) {
    return {
      badge: "bg-yellow-100 text-yellow-700",
      bar: "bg-yellow-500",
    };
  }

  return {
    badge: "bg-red-100 text-red-700",
    bar: "bg-red-500",
  };
}

function WorkerTable({ workers, onSelectWorker }: WorkerTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800">
          Worker Productivity
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Productivity metrics for all factory workers
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="text-left px-5 py-4">Worker</th>
              <th className="text-left px-5 py-4">Active Time</th>
              <th className="text-left px-5 py-4">Idle Time</th>
              <th className="text-left px-5 py-4">Units</th>
              <th className="text-left px-5 py-4">Units / Hr</th>
              <th className="text-left px-5 py-4">Utilization</th>
            </tr>
          </thead>

          <tbody>
            {workers.map((worker) => {
              const styles = getUtilizationStyles(worker.utilization);
              return (
                <tr
                  key={worker.workerId}
                  onClick={() => onSelectWorker(worker.workerId)}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {worker.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {worker.workerId}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {(worker.activeTime / 60).toFixed(0)} min
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {(worker.idleTime / 60).toFixed(0)} min
                  </td>

                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {worker.totalUnits}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {worker.unitsPerHour.toFixed(1)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles.badge}`}
                      >
                        {worker.utilization.toFixed(1)}%
                      </span>

                      <div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${styles.bar}`}
                          style={{ width: `${worker.utilization}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkerTable;
