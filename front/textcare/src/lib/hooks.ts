import { useQuery } from "@tanstack/react-query";
import { baseApiUrl } from "./apiConfig";
import { apiClient } from "@/lib/api";
import { Provider, ProvidersResponse } from "@/types/provider";

const fetchProviders = async (): Promise<ProvidersResponse> => {
    const response = await apiClient(
        `${baseApiUrl}/v1/providers?location=San Rafael, California`,
        { method: "GET" },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch providers");
    }

    return response.json();
};

export const useProvidersQuery = () =>
    useQuery<ProvidersResponse, Error, Provider[]>({
        queryKey: ["providers"],
        queryFn: fetchProviders,
        select: (data) => data.providers.slice(0, -1),
        staleTime: 120000,
    });
