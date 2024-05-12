import { Client, ClientCreate, ClientRepository } from "../interfaces/client.interface";
import { ConfirmAccessCode, Login } from "../interfaces/user.interface";
import { sendEmailCode } from "../middleware/sendEmailCode";
import { ClientRepositoryPrisma } from "../repositories/client.repository";
const jwt = require("jsonwebtoken");

class ClientUseCase {

    private ClientRepositoryPrisma: ClientRepository;

    constructor() {
        this.ClientRepositoryPrisma = new ClientRepositoryPrisma();
    };

    async create({fullName, email, phoneNumber, cep}: ClientCreate): Promise<Client> {
        const verifyIfClientExists = await this.ClientRepositoryPrisma.findByEmail(email);
        
        if(verifyIfClientExists) {
            throw new Error(`E-mail já cadastrado!`);
        };

        const result = await this.ClientRepositoryPrisma.create({
            fullName, 
            email, 
            phoneNumber, 
            cep
        });

        return result;
    };

    async login({email}: Login): Promise<String> {

        const verifyIfUserExists = await this.ClientRepositoryPrisma.findByEmail(email);

        if(!verifyIfUserExists) {
            throw new Error(`E-mail não cadastrado ou incorreto.`);
        };

        const code = sendEmailCode({email});
        const result = await this.ClientRepositoryPrisma.setAccessCode(email, code);

        return "Código enviado para o email cadastrado.";
    };

    async confirmAccessCode({email, code}: ConfirmAccessCode): Promise<{token: string}> {
        const verifyIfClientExists = await this.ClientRepositoryPrisma.findByEmail(email);

        if(!verifyIfClientExists) {
            throw new Error(`E-mail não cadastrado ou incorreto.`);
        };

        if(verifyIfClientExists?.accessCode !== code) {
            throw new Error(`Código inválido.`);
        };

        const token = jwt.sign({ id: verifyIfClientExists?.id }, process.env.SECRET_KEY, { expiresIn: '24h' });

        const result = await this.ClientRepositoryPrisma.setToken(email, token);

        return {
            token: token
        };

    };

};

export { ClientUseCase };