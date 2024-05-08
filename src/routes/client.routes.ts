import { FastifyInstance } from "fastify";

import { ClientCreate } from "../interfaces/client.interface";
import { ClientUseCase } from "../usecases/client.usecase";

export async function clientRoutes(fastify: FastifyInstance) {
    
    const clientUseCase = new ClientUseCase();
    
    fastify.post("/register", async (req, reply) => {

        const { fullName, email, phoneNumber, cep } = req.body as ClientCreate;
        
        try {
            const data = await clientUseCase.create({
                fullName, 
                email, 
                phoneNumber, 
                cep
            });

            reply.send("Usuário cadastrado com sucesso.").status(200);
        } catch (err) {
            reply.send(err);
        }
    });
    
};