interface FilterBarProps {
  selectedWorker: string;
  selectedStation: string;
  workerOptions: { id: string; name: string }[];
  stationOptions: { id: string; name: string }[];
  onWorkerChange: (value: string) => void;
  onStationChange: (value: string) => void;
}

function FilterBar({
  selectedWorker,
  selectedStation,
  workerOptions,
  stationOptions,
  onWorkerChange,
  onStationChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Filter Worker
          </label>

          <select
            value={selectedWorker}
            onChange={(e) => onWorkerChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="all">All Workers</option>
            {workerOptions.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Filter Workstation
          </label>

          <select
            value={selectedStation}
            onChange={(e) => onStationChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="all">All Workstations</option>
            {stationOptions.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;