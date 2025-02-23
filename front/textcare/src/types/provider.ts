export interface Provider {
    id: string;
    name: string;
    specialization: string;
    education: string;
    description: string;
    location: string;
}

export interface ProvidersResponse {
    providers: Provider[];
}
