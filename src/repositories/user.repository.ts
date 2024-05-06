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

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        const result = await prismaClient.user.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        });

        return result ?? null;
    };
};

export { UserRepositoryPrisma };