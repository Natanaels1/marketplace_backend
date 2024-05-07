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

    async findByEmail(email: string): Promise<Client | null> {
        const result = await prismaClient.client.findFirst({
            where: {
                email: email
            }
        });

        return result ?? null;
    };

};

export { ClientRepositoryPrisma };