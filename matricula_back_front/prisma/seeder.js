import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const seed = fs.readFileSync("prisma/data.json", "utf8");
  const data = JSON.parse(seed);

  // Seed Perfis
  for (const perfil of data.perfis) {
    await prisma.perfil.create({
      data: perfil,
    });
  }

  // Seed Usuarios
  for (const usuario of data.usuarios) {
    await prisma.usuario.create({
      data: usuario,
    });
  }

  // Seed Escolas
  for (const escola of data.escolas) {
    await prisma.escola.create({
      data: escola,
    });
  }

  // Seed TurmasEscolas
  for (const turmaEscola of data.turmasEscolas) {
    for (const ano of turmaEscola.anos) {
      await prisma.turmaEscola.create({
        data: {
          id_escola_fk: turmaEscola.escola_id,
          ano: ano.ano,
          qtde_vagas_ofertadas: ano.qtde_vagas_ofertadas,
          qtde_vagas_disponiveis: ano.qtde_vagas_disponiveis,
        },
      });
    }
  }

  // Seed EstudantesTurmasEscola
  for (const estudanteTurmaEscola of data.EstudantesTurmasEscola) {
    await prisma.estudantesTurmasEscola.create({
      data: {
        ano: estudanteTurmaEscola.ano,
        id_escola_fk: estudanteTurmaEscola.id_escola_fk,
        id_estudante_fk: estudanteTurmaEscola.id_estudante_fk,
        datahora_prematricula: estudanteTurmaEscola.datahora_prematricula,
        datahora_matricula: estudanteTurmaEscola.datahora_matricula,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });