import DetailPanel from "../components/DetailPanel";
import type { WorkerMetric, WorkstationMetric } from "../types/metrics";

interface DetailPanelSectionProps {
  selectedWorkerDetails: WorkerMetric | null;
  selectedStationDetails: WorkstationMetric | null;
  onCloseWorkerDetails: () => void;
  onCloseStationDetails: () => void;
}

interface MetricTileProps {
  label: string;
  value: string | number;
}

function MetricTile({ label, value }: MetricTileProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

interface PanelContentProps {
  utilization: number;
  metrics: MetricTileProps[];
}

function PanelContent({ utilization, metrics }: PanelContentProps) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-slate-500">Utilization</p>
        <p className="text-2xl font-bold text-slate-800">
          {utilization.toFixed(1)}%
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <MetricTile
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
    </div>
  );
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
          <PanelContent
            utilization={selectedWorkerDetails.utilization}
            metrics={[
              {
                label: "Active Time",
                value: `${(selectedWorkerDetails.activeTime / 60).toFixed(
                  0
                )} min`,
              },
              {
                label: "Idle Time",
                value: `${(selectedWorkerDetails.idleTime / 60).toFixed(
                  0
                )} min`,
              },
              {
                label: "Units Produced",
                value: selectedWorkerDetails.totalUnits,
              },
              {
                label: "Units / Hour",
                value: selectedWorkerDetails.unitsPerHour.toFixed(1),
              },
            ]}
          />
        )}
      </DetailPanel>

      <DetailPanel
        isOpen={!!selectedStationDetails}
        title={selectedStationDetails?.name || "Workstation Details"}
        onClose={onCloseStationDetails}
      >
        {selectedStationDetails && (
          <PanelContent
            utilization={selectedStationDetails.utilization}
            metrics={[
              {
                label: "Occupancy Time",
                value: `${(
                  selectedStationDetails.occupancyTime / 60
                ).toFixed(0)} min`,
              },
              {
                label: "Productive Time",
                value: `${(
                  selectedStationDetails.productiveTime / 60
                ).toFixed(0)} min`,
              },
              {
                label: "Units Produced",
                value: selectedStationDetails.totalUnits,
              },
              {
                label: "Throughput",
                value: `${selectedStationDetails.throughputRate.toFixed(
                  1
                )}/hr`,
              },
            ]}
          />
        )}
      </DetailPanel>
    </>
  );
}

export default DetailPanelSection;