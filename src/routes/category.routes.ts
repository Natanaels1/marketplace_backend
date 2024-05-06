import { FastifyInstance } from "fastify";

import { CategoryUseCase } from "../usecases/category.usecase";
import { CategoryCreate } from "../interfaces/category.interface";

export async function categoryRoutes(fastify: FastifyInstance) {
    
    const categoryUseCase = new CategoryUseCase();
    
    fastify.post("/", async (req, reply) => {

        const { name, imageUrl } = req.body as CategoryCreate;
        
        try {
            const data = await categoryUseCase.create({
                name,
                imageUrl
            });

            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get("/", async (req, reply) => {
        try {
            const data = await categoryUseCase.get();

            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
    
};