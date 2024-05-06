import { Category, CategoryCreate, CategoryRepository } from "../interfaces/category.interface";
import { CategoryRepositoryPrisma } from "../repositories/category.repository";

class CategoryUseCase {

    private CategoryRepositoryPrisma: CategoryRepository;

    constructor() {
        this.CategoryRepositoryPrisma = new CategoryRepositoryPrisma();
    };

    async create({name, imageUrl}: CategoryCreate): Promise<Category> {
        
        const result = await this.CategoryRepositoryPrisma.create({
            name,
            imageUrl
        });

        return result;
    };

    async get(): Promise<Category[]> {
        
        const result = await this.CategoryRepositoryPrisma.get({});

        return result;
    };

};

export { CategoryUseCase };