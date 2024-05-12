import { ConfirmAccessCode, Login, User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { sendEmailCode } from "../middleware/sendEmailCode";
const jwt = require('jsonwebtoken');

class UserUseCase {

    private UserRepositoryPrisma: UserRepository;

    constructor() {
        this.UserRepositoryPrisma = new UserRepositoryPrisma();
    };

    async create({fullName, email, phoneNumber, cep, categoryId}: UserCreate): Promise<User> {
        
        const verifyIfUserExists = await this.UserRepositoryPrisma.findByEmail(email);
        
        if(verifyIfUserExists) {
            throw new Error(`E-mail já cadastrado.`);
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

    async login({email}: Login): Promise<String> {

        const verifyIfUserExists = await this.UserRepositoryPrisma.findByEmail(email);

        if(!verifyIfUserExists) {
            throw new Error(`E-mail não cadastrado ou incorreto.`);
        };

        const code = sendEmailCode({email});
        const result = await this.UserRepositoryPrisma.setAccessCode(email, code);

        return "Código enviado para o email cadastrado.";
    };

    async confirmAccessCode({email, code}: ConfirmAccessCode): Promise<{token: string}> {
        const verifyIfUserExists = await this.UserRepositoryPrisma.findByEmail(email);

        if(!verifyIfUserExists) {
            throw new Error(`E-mail não cadastrado ou incorreto.`);
        };

        if(verifyIfUserExists?.accessCode !== code) {
            throw new Error(`Código inválido.`);
        };

        const token = jwt.sign({ id: verifyIfUserExists?.id }, process.env.SECRET_KEY, { expiresIn: '24h' });

        const result = await this.UserRepositoryPrisma.setToken(email, token);

        return {
            token: token
        };

    };
    
};

export { UserUseCase };