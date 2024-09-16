import Database from './database.js';

async function up() {
    const db = await Database.connect();

    const usuarioSql = `
    CREATE TABLE usuario (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(40) NULL,
      perfil_id INTEGER,
      FOREIGN KEY (perfil_id) REFERENCES perfil (id_perfil)
    )
  `;


    const alerta_userSql = `
    CREATE TABLE alerta_user (
      id_alerta_user INTEGER PRIMARY KEY AUTOINCREMENT,
      data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
      usuario_id INTEGER,
      alerta_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuario (id_usuario),
      FOREIGN KEY (alerta_id) REFERENCES alerta (id_alerta)
    )
  `;

    const alertaSql = `
    CREATE TABLE alerta (
      id_alerta INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo VARCHAR(40),
      descricao VARCHAR(255) NOT NULL
    )
  `;

    await db.run(usuarioSql);
    await db.run(alerta_userSql);
    await db.run(alertaSql);
}

export default { up };


