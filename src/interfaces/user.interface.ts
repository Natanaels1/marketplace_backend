export interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    cep: string;
    created_at: Date;
    updated_at: Date;
    categoryId: string;
};

export interface UserCreate {
    fullName: string;
    email: string;
    phoneNumber: string;
    cep: string;
    categoryId: string;
};

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User | null>;
};