import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function readAllSchoolVagas(id){
    return await prisma.turmaEscola.findMany({
        where: {
          id_escola_fk: id, // filtrando a escola
        },
        select: {
          ano: true, // incluindo ano
          qtde_vagas_disponiveis: true, //as vagas disponiveis
          qtde_vagas_ofertadas: true, //as vagas ofertadas
        },
    });
}

export default { readAllSchoolVagas }