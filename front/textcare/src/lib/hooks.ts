import { useQuery } from "@tanstack/react-query";
import { baseApiUrl } from "./apiConfig";
import { apiClient } from "@/lib/api";
import { Provider, ProvidersResponse } from "@/types/provider";
import { useEffect, RefObject } from "react";

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

export const useAutoCompleteToggle = (
    refs: React.RefObject<{
        inputRef: HTMLInputElement | null;
        optionsRef: HTMLDivElement | null;
    } | null>,

    setShowState: (show: boolean) => void,
) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (refs.current) {
                const { inputRef, optionsRef } = refs.current;

                if (optionsRef && !optionsRef.contains(event.target as Node)) {
                    setShowState(false);
                }

                if (inputRef && inputRef.contains(event.target as Node)) {
                    setShowState(true);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, setShowState]);
};
