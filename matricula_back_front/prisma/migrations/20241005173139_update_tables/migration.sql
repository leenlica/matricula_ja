/*
  Warnings:

  - Made the column `datahora_prematricula` on table `EstudantesTurmasEscola` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EstudantesTurmasEscola" (
    "id_estudante_turma" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_escola_fk" INTEGER NOT NULL,
    "id_estudante_fk" INTEGER,
    "ano" INTEGER NOT NULL,
    "datahora_prematricula" TEXT NOT NULL,
    "datahora_matricula" TEXT,
    CONSTRAINT "EstudantesTurmasEscola_id_escola_fk_ano_fkey" FOREIGN KEY ("id_escola_fk", "ano") REFERENCES "TurmaEscola" ("id_escola_fk", "ano") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EstudantesTurmasEscola_id_escola_fk_fkey" FOREIGN KEY ("id_escola_fk") REFERENCES "Escola" ("id_escola") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EstudantesTurmasEscola_id_estudante_fk_fkey" FOREIGN KEY ("id_estudante_fk") REFERENCES "Usuario" ("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EstudantesTurmasEscola" ("ano", "datahora_matricula", "datahora_prematricula", "id_escola_fk", "id_estudante_fk", "id_estudante_turma") SELECT "ano", "datahora_matricula", "datahora_prematricula", "id_escola_fk", "id_estudante_fk", "id_estudante_turma" FROM "EstudantesTurmasEscola";
DROP TABLE "EstudantesTurmasEscola";
ALTER TABLE "new_EstudantesTurmasEscola" RENAME TO "EstudantesTurmasEscola";
CREATE UNIQUE INDEX "EstudantesTurmasEscola_id_estudante_fk_ano_id_escola_fk_key" ON "EstudantesTurmasEscola"("id_estudante_fk", "ano", "id_escola_fk");
CREATE TABLE "new_Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil_id" INTEGER,
    CONSTRAINT "Usuario_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "Perfil" ("id_perfil") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("id_usuario", "nome", "perfil_id") SELECT "id_usuario", "nome", "perfil_id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
