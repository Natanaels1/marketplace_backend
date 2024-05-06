export interface Category {
    id: string;
    name: string;
    imageUrl: string;
};

export interface CategoryCreate {
    name: string;
    imageUrl: string;
};

export interface CategoryRepository {
    create(data: CategoryCreate): Promise<Category>;
};