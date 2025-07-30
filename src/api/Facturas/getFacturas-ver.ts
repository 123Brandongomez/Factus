import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosConfig";
import { FacturaCreateRequest } from "@/types/Facturas";
import { extractObjectData } from "@/utils/responseHandler";

export async function getFacturasVer(number: string): Promise<FacturaCreateRequest | null> {
  const response = await axiosInstance.get(`/bills/show/${number}`);
  return extractObjectData<FacturaCreateRequest>(response);
}

export function useGetFacturasVer(number: string) {
  return useQuery<FacturaCreateRequest | null>({
    queryKey: ["facturas", number],
    queryFn: () => getFacturasVer(number),
    enabled: !!number, // Solo ejecutar si hay un número
  });
}
