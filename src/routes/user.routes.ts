import { FastifyInstance } from "fastify";

import { UserUseCase } from "../usecases/user.usecase";
import { ConfirmAccessCode, Login, UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
    
    const userUseCase = new UserUseCase();
    
    fastify.post("/register", async (req, reply) => {

        const { fullName, email, phoneNumber, cep, categoryId } = req.body as UserCreate;
        
        try {
            const data = await userUseCase.create({
                fullName, 
                email, 
                phoneNumber, 
                cep,
                categoryId
            });

            reply.send("Usuário cadastrado com sucesso.").status(200);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.post("/login", async (req, reply) => {

        const { email } = req.body as Login;

        try {
            const data = await userUseCase.login({email});

            reply.send(data).status(200);

        } catch (err) {
            reply.send(err);
        }
    });

    fastify.post("/confirmAccessCode", async (req, reply) => {
        const { email, code } = req.body as ConfirmAccessCode;

        try {
            const data = await userUseCase.confirmAccessCode({email, code});

            reply.send(data).status(200);

        } catch (err) {
            reply.send(err);
        }
    });
    
};