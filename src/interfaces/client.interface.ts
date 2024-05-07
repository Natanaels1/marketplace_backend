export interface Client {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    cep: string;
    created_at: Date;
    updated_at: Date;
};

export interface ClientCreate {
    fullName: string;
    email: string;
    phoneNumber: string;
    cep: string;
};

export interface ClientRepository {
    create(data: ClientCreate): Promise<Client>;
    findByEmail(email: string): Promise<Client | null>;
};