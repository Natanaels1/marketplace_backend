import { FastifyInstance } from "fastify";

import { ServiceUseCase } from "../usecases/service.usecase";
import { ServiceCreate } from "../interfaces/service.interface";

export async function serviceRoutes(fastify: FastifyInstance) {
    
    const serviceUseCase = new ServiceUseCase();
    
    fastify.post("/create", async (req, reply) => {

        const { name, description, clientId } = req.body as ServiceCreate;
        
        try {
            const data = await serviceUseCase.create({
                name, 
                description, 
                clientId
            });

            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get("/", async (req, reply) => {
        const { id } = req.params as string;
        try {
            const data = await serviceUseCase.get(id);

            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
    
};