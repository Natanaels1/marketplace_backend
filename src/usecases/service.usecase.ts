import { Service, ServiceCreate, ServiceRepository } from "../interfaces/service.interface";
import { ServiceRepositoryPrisma } from "../repositories/service.repository";

class ServiceUseCase {

    private ServiceRepositoryPrisma: ServiceRepository;

    constructor() {
        this.ServiceRepositoryPrisma = new ServiceRepositoryPrisma();
    };

    async create(data: ServiceCreate): Promise<Service> {
        
        const result = await this.ServiceRepositoryPrisma.create(data);

        return result;
    };

    async get(id: string): Promise<Service | null> {
        
        const result = await this.ServiceRepositoryPrisma.get(id);

        return result;
    };

};

export { ServiceUseCase };