import WorkstationTable from "../components/WorkstationTable";

import type { WorkstationMetric } from "../types/metrics";

interface WorkstationSectionProps {
  workstations: WorkstationMetric[];
  handleSelectStation: (workerId: string) => void;
}

function WorkstationSection({
  workstations,
  handleSelectStation,
}: WorkstationSectionProps) {
  return (
    <>
      {workstations.length > 0 ? (
        <WorkstationTable
          workstations={workstations}
          onSelectStation={handleSelectStation}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-10 text-center text-slate-500">
          No workstation data available for the selected filter.
        </div>
      )}
    </>
  );
}

export default WorkstationSection;
