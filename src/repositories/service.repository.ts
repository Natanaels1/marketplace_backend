import prismaClient from '../database/prisma-client';
import { Service, ServiceCreate } from '../interfaces/service.interface';

class ServiceRepositoryPrisma {

    async create(data: ServiceCreate): Promise<Service> {
        const { name, description, clientId } = data;
        const result = await prismaClient.service.create({
            data: {
                name: name,
                description: description,
                clientId: clientId
            }
        });

        return result;
    };

    async update(data: ServiceCreate): Promise<string> {
        const { name, description, clientId } = data;
        const result = await prismaClient.service.update({
            data: {
                name: name,
                description: description,
                clientId: clientId
            }
        });

        return result;
    };

    async get(id: string): Promise<Service | null> {
        const result = await prismaClient.service.findFirst({
            where: {
                id: id
            }
        });

        return result;
    };
    
};

export { ServiceRepositoryPrisma };