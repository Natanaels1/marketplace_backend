import prismaClient from '../database/prisma-client';
import { Client, ClientCreate } from '../interfaces/client.interface';

class ClientRepositoryPrisma {
    async create(data: ClientCreate): Promise<Client> {

        const { fullName, email, phoneNumber, cep } = data;

        const result = await prismaClient.client.create({
            data: {
                fullName, 
                email, 
                phoneNumber, 
                cep
            }
        });

        return result;
    };

    async findByPhoneNumber(phoneNumber: string): Promise<Client | null> {
        const result = await prismaClient.client.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        });

        return result ?? null;
    };
};

export { ClientRepositoryPrisma };