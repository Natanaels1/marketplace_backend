import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {

    private UserRepositoryPrisma: UserRepository;

    constructor() {
        this.UserRepositoryPrisma = new UserRepositoryPrisma();
    };

    async create({fullName, email, phoneNumber, cep, categoryId}: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.UserRepositoryPrisma.findByPhoneNumber(phoneNumber);
        
        if(verifyIfUserExists) {
            throw new Error(`Numero de telefone já cadastrado!`);
        };

        const result = await this.UserRepositoryPrisma.create({
            fullName, 
            email, 
            phoneNumber, 
            cep,
            categoryId
        });

        return result;
    };

};

export { UserUseCase };