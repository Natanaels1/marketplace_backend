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

    async setAccessCode(email: string, code: number): Promise<Client> {
        const result = await prismaClient.client.update({
            where: { email: email },
            data: { accessCode: code }
        });

        return result;
    };

    async setToken(email: string, token: string): Promise<Client> {
        const result = await prismaClient.client.update({
            where: { email: email },
            data: { token: token }
        });

        return result;
    };

};

export { ClientRepositoryPrisma };