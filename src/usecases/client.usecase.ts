import { Client, ClientCreate, ClientRepository } from "../interfaces/client.interface";
import { ClientRepositoryPrisma } from "../repositories/client.repository";

class ClientUseCase {

    private ClientRepositoryPrisma: ClientRepository;

    constructor() {
        this.ClientRepositoryPrisma = new ClientRepositoryPrisma();
    };

    async create({fullName, email, phoneNumber, cep}: ClientCreate): Promise<Client> {
        const verifyIfClientExists = await this.ClientRepositoryPrisma.findByPhoneNumber(phoneNumber);
        
        if(verifyIfClientExists) {
            throw new Error(`Numero de telefone já cadastrado!`);
        };

        const result = await this.ClientRepositoryPrisma.create({
            fullName, 
            email, 
            phoneNumber, 
            cep
        });

        return result;
    };

};

export { ClientUseCase };