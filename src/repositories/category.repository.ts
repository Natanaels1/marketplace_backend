import prismaClient from '../database/prisma-client';
import { Category, CategoryCreate } from '../interfaces/category.interface';

class CategoryRepositoryPrisma {

    async create(data: CategoryCreate): Promise<Category> {
        const { name, imageUrl } = data;
        const result = await prismaClient.category.create({
            data: {
                name,
                imageUrl
            }
        });

        return result;
    };

    async get(): Promise<Category[]> {
        const result = await prismaClient.category.findMany({});

        return result;
    };
    
};

export { CategoryRepositoryPrisma };