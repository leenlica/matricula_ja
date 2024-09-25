-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "perfil_id" INTEGER,
    CONSTRAINT "Usuario_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "Perfil" ("id_perfil") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlertaUser" (
    "id_alerta_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_envio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "alerta_id" INTEGER NOT NULL,
    CONSTRAINT "AlertaUser_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlertaUser_alerta_id_fkey" FOREIGN KEY ("alerta_id") REFERENCES "Alerta" ("id_alerta") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id_alerta" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id_perfil" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_perfil" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Escola" (
    "id_escola" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_escola" TEXT NOT NULL,
    "endereco" TEXT
);

-- CreateTable
CREATE TABLE "TurmaEscola" (
    "id_escola_fk" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "qtde_vagas_ofertadas" INTEGER NOT NULL,
    "qtde_vagas_disponiveis" INTEGER NOT NULL,
    CONSTRAINT "TurmaEscola_id_escola_fk_fkey" FOREIGN KEY ("id_escola_fk") REFERENCES "Escola" ("id_escola") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EstudantesTurmasEscola" (
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

-- CreateIndex
CREATE UNIQUE INDEX "TurmaEscola_id_escola_fk_ano_key" ON "TurmaEscola"("id_escola_fk", "ano");

-- CreateIndex
CREATE UNIQUE INDEX "EstudantesTurmasEscola_id_estudante_fk_ano_id_escola_fk_key" ON "EstudantesTurmasEscola"("id_estudante_fk", "ano", "id_escola_fk");
