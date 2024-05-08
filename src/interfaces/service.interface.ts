export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    finished: boolean;
    clientId: string;
    userId: string;
};

export interface ServiceCreate {
    name: string;
    description: string;
    clientId: string;
};

export interface ServiceRepository {
    create(data: ServiceCreate): Promise<Service>;
    get(id: string): Promise<Service | null>;
};