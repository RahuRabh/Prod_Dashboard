import SummaryCard from "../components/SummaryCard";
import type { FactoryMetric } from "../types/metrics";

interface SummarySectionProps {
  factoryMetric: FactoryMetric | null;
}

function SummarySection({ factoryMetric }: SummarySectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <SummaryCard
        title="Total Production"
        value={factoryMetric?.totalProduction ?? 0}
        subtitle="Units produced across factory"
      />

      <SummaryCard
        title="Active Time"
        value={`${((factoryMetric?.totalActive ?? 0) / 3600).toFixed(1)} hrs`}
        subtitle="Total productive time"
      />

      <SummaryCard
        title="Average Utilization"
        value={`${(factoryMetric?.avgUtilization ?? 0).toFixed(1)}%`}
        subtitle="Across all workers"
      />

      <SummaryCard
        title="Production Rate"
        value={`${(factoryMetric?.avgProductionRate ?? 0).toFixed(1)}/hr`}
        subtitle="Average units per hour"
      />
    </div>
  );
}

export default SummarySection;
