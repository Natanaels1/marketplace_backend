export interface Client {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    cep: string;
    created_at: Date;
    updated_at: Date;
    categoryId: string;
};

export interface ClientCreate {
    fullName: string;
    email: string;
    phoneNumber: string;
    cep: string;
};

export interface ClientRepository {
    create(data: ClientCreate): Promise<Client>;
    findByPhoneNumber(phoneNumber: string): Promise<Client | null>;
};