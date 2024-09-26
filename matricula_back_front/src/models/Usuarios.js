import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function create(email, senha){
    return await prisma.usuario.create({
        data:{
            email,
            senha
        }
    })
}

async function readByEmail(email) {
    return await prisma.usuario.findUnique({
        where: {
            email
        }
    })
}

export default {create, readByEmail}