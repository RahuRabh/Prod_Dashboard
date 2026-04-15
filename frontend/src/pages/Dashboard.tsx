import { useEffect, useState, useMemo } from "react";

//services
import {
  fetchFactoryMetrics,
  fetchWorkerMetrics,
  fetchWorkstationMetrics,
  fetchWorkerById,
  fetchWorkstationById,
} from "../services/api";

// types
import {
  type FactoryMetric,
  type WorkerMetric,
  type WorkstationMetric,
} from "../types/metrics";

// components
import Loader from "../components/Loader";
import Error from "../components/Error";

// sections
import DashboardHeader from "../sections/DashboardHeader";
import SummarySection from "../sections/SummarySection";
import FilterSection from "../sections/FilterSection";
import WorkerSection from "../sections/WorkerSection";
import WorkstationSection from "../sections/WorkStationSection";
import DetailPanelSection from "../sections/DetailPanelSection";

function Dashboard() {
  const [factoryMetrics, setFactoryMetrics] = useState<FactoryMetric | null>(
    null,
  );
  const [selectedWorker, setSelectedWorker] = useState("all");
  const [selectedStation, setSelectedStation] = useState("all");

  const [workers, setWorkers] = useState<WorkerMetric[]>([]);
  const [workstations, setWorkstations] = useState<WorkstationMetric[]>([]);

  const [selectedWorkerDetails, setSelectedWorkerDetails] =
    useState<WorkerMetric | null>(null);

  const [selectedStationDetails, setSelectedStationDetails] =
    useState<WorkstationMetric | null>(null);

  const filteredWorkers = useMemo(() => {
    if (selectedWorker === "all") return workers;

    return workers.filter((worker) => worker.workerId === selectedWorker);
  }, [workers, selectedWorker]);

  const filteredStations = useMemo(() => {
    if (selectedStation === "all") return workstations;

    return workstations.filter(
      (station) => station.workstationId === selectedStation,
    );
  }, [workstations, selectedStation]);

  const handleSelectWorker = async (workerId: string) => {
    const details = await fetchWorkerById(workerId);
    setSelectedWorkerDetails(details);
  };

  const handleSelectStation = async (stationId: string) => {
    const details = await fetchWorkstationById(stationId);
    setSelectedStationDetails(details);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [factory, workerData, stationData] = await Promise.all([
          fetchFactoryMetrics(),
          fetchWorkerMetrics(),
          fetchWorkstationMetrics(),
        ]);

        setFactoryMetrics(factory);
        setWorkers(Array.isArray(workerData[0]) ? workerData[0] : workerData);
        setWorkstations(stationData);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />

        <SummarySection factoryMetric={factoryMetrics} />

        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Dataset Overview
          </h2>

          <div className="space-y-6">
            <FilterSection
              selectedWorker={selectedWorker}
              selectedStation={selectedStation}
              workers={workers}
              workstations={workstations}
              onWorkerChange={setSelectedWorker}
              onStationChange={setSelectedStation}
            />

            <WorkerSection
              workers={filteredWorkers}
              handleSelectWorker={handleSelectWorker}
            />

            <WorkstationSection
              workstations={filteredStations}
              handleSelectStation={handleSelectStation}
            />
          </div>
        </div>
      </div>

      <DetailPanelSection
        selectedWorkerDetails={selectedWorkerDetails}
        selectedStationDetails={selectedStationDetails}
        onCloseWorkerDetails={() => setSelectedWorkerDetails(null)}
        onCloseStationDetails={() => setSelectedStationDetails(null)}
      />
    </div>
  );
}
export default Dashboard;
