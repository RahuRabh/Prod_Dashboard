import DetailPanel from "../components/DetailPanel";
import type { WorkerMetric, WorkstationMetric } from "../types/metrics";

interface DetailPanelSectionProps {
  selectedWorkerDetails: WorkerMetric | null;
  selectedStationDetails: WorkstationMetric | null;
  onCloseWorkerDetails: () => void;
  onCloseStationDetails: () => void;
}

function DetailPanelSection({
  selectedWorkerDetails,
  selectedStationDetails,
  onCloseWorkerDetails,
  onCloseStationDetails,
}: DetailPanelSectionProps) {
  return (
    <>
      <DetailPanel
        isOpen={!!selectedWorkerDetails}
        title={selectedWorkerDetails?.name || "Worker Details"}
        onClose={onCloseWorkerDetails}
      >
        {selectedWorkerDetails && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">Utilization</p>
              <p className="text-2xl font-bold text-slate-800">
                {selectedWorkerDetails.utilization.toFixed(1)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Active Time</p>
                <p className="text-xl font-semibold text-slate-800">
                  {(selectedWorkerDetails.activeTime / 60).toFixed(0)} min
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Idle Time</p>
                <p className="text-xl font-semibold text-slate-800">
                  {(selectedWorkerDetails.idleTime / 60).toFixed(0)} min
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Units Produced</p>
                <p className="text-xl font-semibold text-slate-800">
                  {selectedWorkerDetails.totalUnits}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Units / Hour</p>
                <p className="text-xl font-semibold text-slate-800">
                  {selectedWorkerDetails.unitsPerHour.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        )}
      </DetailPanel>

      <DetailPanel
        isOpen={!!selectedStationDetails}
        title={selectedStationDetails?.name || "Workstation Details"}
        onClose={onCloseStationDetails}
      >
        {selectedStationDetails && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">Utilization</p>
              <p className="text-2xl font-bold text-slate-800">
                {selectedStationDetails.utilization.toFixed(1)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Occupancy Time</p>
                <p className="text-xl font-semibold text-slate-800">
                  {(selectedStationDetails.occupancyTime / 60).toFixed(0)} min
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Productive Time</p>
                <p className="text-xl font-semibold text-slate-800">
                  {(selectedStationDetails.productiveTime / 60).toFixed(0)} min
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Units Produced</p>
                <p className="text-xl font-semibold text-slate-800">
                  {selectedStationDetails.totalUnits}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Throughput</p>
                <p className="text-xl font-semibold text-slate-800">
                  {selectedStationDetails.throughputRate.toFixed(1)}/hr
                </p>
              </div>
            </div>
          </div>
        )}
      </DetailPanel>
    </>
  );
}

export default DetailPanelSection;
