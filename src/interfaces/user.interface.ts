export interface User {
    id: string;
    accessCode: number;
    token: string;
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

export interface Login {
    email: string;
};

export interface ConfirmAccessCode {
    email: string;
    code: number;
};

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    setAccessCode(email: string, code: number): Promise<User>;
    setToken(email: string, token: string): Promise<User>;
};