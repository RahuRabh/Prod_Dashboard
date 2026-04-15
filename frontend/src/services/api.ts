import {
  type FactoryMetric,
  type WorkerMetric,
  type WorkstationMetric,
} from "../types/metrics";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const fetchFactoryMetrics = async (): Promise<FactoryMetric> => {
  const response = await fetch(`${API_BASE_URL}/metrics/factory`);
  return handleResponse<FactoryMetric>(response);
};

export const fetchWorkerMetrics = async (): Promise<WorkerMetric[]> => {
  const response = await fetch(`${API_BASE_URL}/metrics/workers`);
  return handleResponse<WorkerMetric[]>(response);
};

export const fetchWorkstationMetrics = async (): Promise<
  WorkstationMetric[]
> => {
  const response = await fetch(`${API_BASE_URL}/metrics/workstations`);
  return handleResponse<WorkstationMetric[]>(response);
};

export const fetchWorkerById = async (
  workerId: string,
): Promise<WorkerMetric> => {
  const response = await fetch(`${API_BASE_URL}/metrics/workers/${workerId}`);
  return handleResponse<WorkerMetric>(response);
};

export const fetchWorkstationById = async (
  stationId: string,
): Promise<WorkstationMetric> => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/workstations/${stationId}`,
  );
  return handleResponse<WorkstationMetric>(response);
};
