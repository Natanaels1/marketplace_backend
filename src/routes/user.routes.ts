import { FastifyInstance } from "fastify";

import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
    
    const userUseCase = new UserUseCase();
    
    fastify.post("/", async (req, reply) => {

        const { fullName, email, phoneNumber, cep, categoryId } = req.body as UserCreate;
        
        try {
            const data = await userUseCase.create({
                fullName, 
                email, 
                phoneNumber, 
                cep,
                categoryId
            });

            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
    
};