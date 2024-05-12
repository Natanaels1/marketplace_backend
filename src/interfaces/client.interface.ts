export interface Client {
    id: string;
    accessCode: number;
    token: string;
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
    setAccessCode(email: string, code: number): Promise<Client>;
    setToken(email: string, token: string): Promise<Client>;
};