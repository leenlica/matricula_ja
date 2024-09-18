import Database from '../database/database.js';


// Criar um novo alerta simples

async function create(titulo, descricao) {
    const db = await Database.connect();
    try {

        if (!titulo || !descricao) {
            throw new Error('Título e descrição são obrigatórios.');
        }


        const result = await db.run('INSERT INTO alerta (titulo, descricao) VALUES (?, ?)', [titulo, descricao]);


        const alertaId = result.lastID;
        return { id: alertaId, message: 'Alerta criado com sucesso.' };
    } catch (error) {
        console.error('Erro ao criar alerta:', error.message);
        throw error;
    }
}

// Atualizar um alerta simples

async function update(alertaId, titulo, descricao) {
    const db = await Database.connect();
    try {

        if (!titulo || !descricao) {
            throw new Error('Título e descrição são obrigatórios.');
        }


        const result = await db.run('UPDATE alerta SET titulo = ?, descricao = ? WHERE id_alerta = ?', [titulo, descricao, alertaId]);

        if (result.changes === 0) {
            throw new Error('Alerta não encontrado ou nenhum dado foi alterado.');
        }

        return { message: 'Alerta atualizado com sucesso.' };
    } catch (error) {
        console.error('Erro ao atualizar alerta:', error.message);
        throw error;
    }
}


// Excluir um alerta

async function remove(alertaId) {
    const db = await Database.connect();
    try {
      await db.run('DELETE FROM alerta WHERE id_alerta = ?', [alertaId]);
      return { message: 'Alerta excluído com sucesso.' };
    } catch (error) {
      console.error('Erro ao excluir alerta:', error.message);
      throw error;
    }
  }

  // Marcar um alerta como lido para um usuário
async function marcarLido(alertaId, usuarioId) {
    const db = await Database.connect();
    try {
        await db.run('UPDATE alerta_user SET lido = 1 WHERE alerta_id = ? AND usuario_id = ?', [alertaId, usuarioId]);
        return { message: 'Alerta lido.' };
    } catch (error) {
        console.error('Erro ao marcar alerta como lido:', error.message);
        throw error;
    }
}

  // Ler um alerta específico
async function read(alertaId) {
    const db = await Database.connect();
    try {
        const alerta = await db.get('SELECT * FROM alerta WHERE id_alerta = ?', [alertaId]);

        if (!alerta) {
            throw new Error('Alerta não encontrado.');
        }

        const usuarios = await db.all('SELECT usuario_id FROM alerta_user WHERE alerta_id = ?', [alertaId]);

        alerta.usuarios = usuarios.map((usuario) => usuario.usuario_id);

        return alerta;
    } catch (error) {
        console.error('Erro ao ler alerta:', error.message);
        throw error;
    }
}

  // Listar todos os alertas
async function readAll() {
    const db = await Database.connect();
    try {
        const alertas = await db.all('SELECT * FROM alerta');

        for (const alerta of alertas) {
            const usuarios = await db.all('SELECT usuario_id FROM alerta_user WHERE alerta_id = ?', [alerta.id_alerta]);
            alerta.usuarios = usuarios.map((usuario) => usuario.usuario_id);
        }

        return alertas;
    } catch (error) {
        console.error('Erro ao listar alertas:', error.message);
        throw error;
    }
}

export default { create, update, remove, marcarLido, read, readAll }

