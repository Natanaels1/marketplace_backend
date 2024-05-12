import { FastifyReply, FastifyRequest  } from "fastify";
const jwt = require('jsonwebtoken');

export function validateToken(req: FastifyRequest, reply: FastifyReply, done) {

    const token = req.headers.authorization;

    if (!token) {
        reply.code(401).send({ message: 'Token não fornecido' });
        return;
    };

    try {
        const decoded = jwt.verify(token.split("Bearer ")[1], process.env.SECRET_KEY);
        done();
    } catch (err) {
        reply.code(401).send({ message: 'Token inválido ou expirado.' });
    };
};

