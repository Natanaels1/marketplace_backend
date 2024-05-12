import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

import { userRoutes } from "./routes/user.routes";
import { categoryRoutes } from "./routes/category.routes";
import { clientRoutes } from "./routes/client.routes";
import { serviceRoutes } from "./routes/service.routes";

const app: FastifyInstance = Fastify();

const start = async () => {

    await app.register(cors);

    await app.register(userRoutes, {
        prefix: "users"
    });

    await app.register(categoryRoutes, {
        prefix: "categories"
    });

    await app.register(clientRoutes, {
        prefix: "clients"
    });

    await app.register(serviceRoutes, {
        prefix: "services"
    });

    try {
        app.listen(
            { port: 4000 },
            () => console.log("listening on port " + 4000)
        );
    } catch (err) {
        process.exit(1);
    }
};

start();