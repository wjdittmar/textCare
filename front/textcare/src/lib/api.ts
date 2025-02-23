let isRefreshing = false;
let failedQueue: any[] = [];
import { baseApiUrl } from "./apiConfig";

const processQueue = (error?: Error, token?: string) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const apiClient = async (input: RequestInfo, init?: RequestInit) => {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
            ...init?.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 401) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => apiClient(input, init));
        }

        isRefreshing = true;

        try {
            const refreshResponse = await fetch(
                `${baseApiUrl}/v1/tokens/refresh`,
                {
                    method: "POST",
                    credentials: "include",
                },
            );

            if (!refreshResponse.ok) throw new Error("Refresh failed");

            const { access_token } = await refreshResponse.json();
            localStorage.setItem("access_token", access_token);

            processQueue(undefined, access_token);
            return apiClient(input, init);
        } catch (error) {
            processQueue(error as Error);
            window.location.href = "/";
            throw error;
        } finally {
            isRefreshing = false;
        }
    }

    return response;
};
