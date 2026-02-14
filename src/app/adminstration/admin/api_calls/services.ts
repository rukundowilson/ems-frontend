import api from "@/app/shared/services/axios";
import { Service, CreateServicePayload } from "../types/services";

export async function getServices(): Promise<Service[]> {
  const res = await api.get("/services");
  return res.data?.data || [];
}

export async function createService(payload: CreateServicePayload): Promise<Service> {
  const res = await api.post("/services", payload);
  return res.data?.data;
}

export async function deleteService(id: string): Promise<void> {
  await api.delete(`/services/${id}`);
}
