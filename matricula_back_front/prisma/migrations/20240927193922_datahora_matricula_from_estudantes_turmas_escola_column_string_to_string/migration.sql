-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EstudantesTurmasEscola" (
    "id_estudante_turma" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_escola_fk" INTEGER NOT NULL,
    "id_estudante_fk" INTEGER,
    "ano" INTEGER NOT NULL,
    "datahora_prematricula" TEXT,
    "datahora_matricula" TEXT,
    CONSTRAINT "EstudantesTurmasEscola_id_escola_fk_ano_fkey" FOREIGN KEY ("id_escola_fk", "ano") REFERENCES "TurmaEscola" ("id_escola_fk", "ano") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EstudantesTurmasEscola_id_escola_fk_fkey" FOREIGN KEY ("id_escola_fk") REFERENCES "Escola" ("id_escola") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EstudantesTurmasEscola_id_estudante_fk_fkey" FOREIGN KEY ("id_estudante_fk") REFERENCES "Usuario" ("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EstudantesTurmasEscola" ("ano", "datahora_matricula", "datahora_prematricula", "id_escola_fk", "id_estudante_fk", "id_estudante_turma") SELECT "ano", "datahora_matricula", "datahora_prematricula", "id_escola_fk", "id_estudante_fk", "id_estudante_turma" FROM "EstudantesTurmasEscola";
DROP TABLE "EstudantesTurmasEscola";
ALTER TABLE "new_EstudantesTurmasEscola" RENAME TO "EstudantesTurmasEscola";
CREATE UNIQUE INDEX "EstudantesTurmasEscola_id_estudante_fk_ano_id_escola_fk_key" ON "EstudantesTurmasEscola"("id_estudante_fk", "ano", "id_escola_fk");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
