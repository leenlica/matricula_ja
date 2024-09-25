import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function readAllSchoolVagas(id, ano){
    return await prisma.turmaEscola.findMany({
        where: {
          id_escola_fk: id, // filtrando a escola
          ano: ano
        },
        select: {
          qtde_vagas_disponiveis: true, //as vagas disponiveis
          qtde_vagas_ofertadas: true, //as vagas ofertadas
        },
    });
}

async function readAllSchoolMatriculas(id, ano){
    return await prisma.estudantesTurmasEscola.findMany({
        where: {
          id_escola_fk: id, // filtrando a escola
          ano: ano
        },
        select: {
          datahora_prematricula: true, //hora e dia da prematricula
          datahora_matricula: true, //se esta matriculado ira exibir o mesmo especificado acima
        },
    });
}

export default { readAllSchoolVagas, readAllSchoolMatriculas };