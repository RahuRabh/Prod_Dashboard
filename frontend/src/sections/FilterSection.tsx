import FilterBar from "../components/FilterBar";

interface FilterBarProps {
  selectedWorker: string;
  selectedStation: string;
  workers: { workerId: string; name: string }[];
  workstations: { workstationId: string; name: string }[];
  onWorkerChange: (value: string) => void;
  onStationChange: (value: string) => void;
}

function FilterSection({
  selectedWorker,
  selectedStation,
  workers,
  workstations,
  onWorkerChange,
  onStationChange,
}: FilterBarProps) {
  return (
    <FilterBar
      selectedWorker={selectedWorker}
      selectedStation={selectedStation}
      workerOptions={workers.map((worker) => ({
        id: worker.workerId,
        name: worker.name,
      }))}
      stationOptions={workstations.map((station) => ({
        id: station.workstationId,
        name: station.name,
      }))}
      onWorkerChange={onWorkerChange}
      onStationChange={onStationChange}
    />
  );
}

export default FilterSection;
