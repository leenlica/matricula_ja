import express from 'express';
import Database from './database/database.js';

const router = express.Router();

// Criar um novo alerta
router.post('/alertas', async (req, res) => {
    const { titulo, descricao, usuarios } = req.body;
    console.log('Dados recebidos:', { titulo, descricao, usuarios });

    if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const db = await Database.connect(); 
        const result = await db.run('INSERT INTO alerta (titulo, descricao) VALUES (?, ?)', [titulo, descricao]);
        const alertaId = result.lastID;

        console.log('Alerta criado com ID:', alertaId); 

        if (usuarios) {
            for (const usuarioId of usuarios) {
                await db.run('INSERT INTO alerta_user (alerta_id, usuario_id) VALUES (?, ?)', [alertaId, usuarioId]);
            }
        } else {
            const allUsers = await db.all('SELECT id_usuario FROM usuario');
            for (const user of allUsers) {
                await db.run('INSERT INTO alerta_user (alerta_id, usuario_id) VALUES (?, ?)', [alertaId, user.id_usuario]);
            }
        }

        res.status(201).json({ id: alertaId });
    } catch (error) {
        console.error('Erro ao criar alerta:', error); 
        res.status(500).json({ error: 'Erro ao criar alerta.' });
    }
});

// Editar um alerta que já existe
router.put('/alertas/:id', async (req, res) => {
    const alertaId = req.params.id;
    const { titulo, descricao, usuarios } = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const db = await Database.connect(); 
        // Atualiza o alerta 
        await db.run('UPDATE alerta SET titulo = ?, descricao = ? WHERE id_alerta = ?', [titulo, descricao, alertaId]);

        // Atualiza os usuários associados ao alerta
        await db.run('DELETE FROM alerta_user WHERE alerta_id = ?', [alertaId]);
        if (usuarios) {
            for (const usuarioId of usuarios) {
                await db.run('INSERT INTO alerta_user (alerta_id, usuario_id) VALUES (?, ?)', [alertaId, usuarioId]);
            }
        }

        res.status(200).json({ message: 'Alerta atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar alerta.' });
    }
});

// Excluir um alerta
router.delete('/alertas/:id', async (req, res) => {
    const alertaId = req.params.id;

    try {
        const db = await Database.connect(); 
       
        await db.run('DELETE FROM alerta WHERE id_alerta = ?', [alertaId]);
        res.status(200).json({ message: 'Alerta excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir alerta.' });
    }
});

// Marcar um alerta como lido
router.put('/alertas/:id/lido', async (req, res) => {
    const alertaId = req.params.id;
    const usuarioId = req.user.id_usuario; 

    try {
        const db = await Database.connect(); 
        
        await db.run('UPDATE alerta_user SET lido = 1 WHERE alerta_id = ? AND usuario_id = ?', [alertaId, usuarioId]);
        res.status(200).json({ message: 'Alerta lido.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao marcar alerta como lido.' });
    }
});


export default router;
