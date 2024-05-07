import prismaClient from '../database/prisma-client';
import { User, UserCreate } from '../interfaces/user.interface';

class UserRepositoryPrisma {

    async create(data: UserCreate): Promise<User> {

        const { fullName, email, phoneNumber, cep, categoryId } = data;

        const result = await prismaClient.user.create({
            data: {
                fullName, 
                email, 
                phoneNumber, 
                cep,
                categoryId
            }
        });

        return result;
    };

    async findByEmail(email: string): Promise<User | null> {
        const result = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        return result ?? null;
    };

    async setAccessCode(email: string, code: number): Promise<User> {
        const result = await prismaClient.user.update({
            where: { email: email },
            data: { accessCode: code }
        });

        return result;
    };

    async setToken(email: string, token: string): Promise<User> {
        const result = await prismaClient.user.update({
            where: { email: email },
            data: { token: token }
        });

        return result;
    };

};

export { UserRepositoryPrisma };