import { FastifyInstance } from "fastify";

import { ServiceUseCase } from "../usecases/service.usecase";
import { ServiceCreate } from "../interfaces/service.interface";
import { validateToken } from "../middleware/validateToken";

export async function serviceRoutes(fastify: FastifyInstance) {
    
    const serviceUseCase = new ServiceUseCase();

    const VALIDATE_TOKEN = { preHandler: validateToken };
    
    fastify.post("/create", VALIDATE_TOKEN ,  async (req, reply) => {

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

    fastify.get<{
        Params: {id: string}
    }>("/:id", VALIDATE_TOKEN , async (req, reply) => {

        const { id } = req.params;
        
        try {
            const data = await serviceUseCase.get(id);

            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
    
};