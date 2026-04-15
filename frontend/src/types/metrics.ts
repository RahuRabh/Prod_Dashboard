export interface WorkerMetric {
  workerId: string;
  name: string;
  activeTime: number;
  idleTime: number;
  totalTime: number;
  totalUnits: number;
  utilization: number;
  unitsPerHour: number;
}

export interface WorkstationMetric {
  workstationId: string;
  name: string;
  occupancyTime: number;
  productiveTime: number;
  totalUnits: number;
  utilization: number;
  throughputRate: number;
}

export interface FactoryMetric {
  totalProduction: number;
  totalActive: number;
  totalIdle: number;
  avgUtilization: number;
  avgProductionRate: number;
}
