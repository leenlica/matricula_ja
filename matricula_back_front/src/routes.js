import express from 'express';
import Alertas from "./models/Alertas.js";
import Vagas from './models/Vagas.js';
import Usuarios from './models/Usuarios.js';


const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email: email },
            include: { perfil: true }, // Inclui o perfil do usuário
        });

        if (!usuario) {
            return res.status(400).json({ message: 'Usuário não existe' });
        }

        // Aqui você deve verificar a senha. Se não for usar bcrypt, verifique a comparação.
        if (senha !== usuario.senha) {
            return res.status(401).json({ message: 'Credenciais incorretas' });
        }

        // Se o login for bem-sucedido, retorne os dados do usuário
        return res.json({
            id: usuario.id_usuario,
            nome: usuario.nome,
            perfil_id: usuario.perfil_id,
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});
// Criar um novo alerta
router.post('/alertas', async (req, res) => {
    const { titulo, descricao, usuarios } = req.body;
    console.log('Dados recebidos:', { titulo, descricao, usuarios });

    if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const result = await Alertas.create(titulo, descricao);

        if (usuarios) {
            for (const usuarioId of usuarios) {
                await prisma.alertaUser.create({
                    data: {
                        alerta_id: result.id,
                        usuario_id: usuarioId,
                    },
                });
            }
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar alerta:', error.message);
        res.status(500).json({ error: 'Erro ao criar alerta.' });
    }
});

// Atualizar um alerta
router.put('/alertas/:id', async (req, res) => {
    const alertaId = req.params.id;
    const { titulo, descricao, usuarios } = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
    }

    try {
        const result = await Alertas.update(alertaId, titulo, descricao);

        if (usuarios) {
            await prisma.alertaUser.deleteMany({
                where: { alerta_id: alertaId },
            });

            for (const usuarioId of usuarios) {
                await prisma.alertaUser.create({
                    data: {
                        alerta_id: alertaId,
                        usuario_id: usuarioId,
                    },
                });
            }
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar alerta:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar alerta.' });
    }
});

// Excluir um alerta
router.delete('/alertas/:id', async (req, res) => {
    const alertaId = req.params.id;

    try {
        const result = await Alertas.remove(alertaId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao excluir alerta:', error.message);
        res.status(500).json({ error: 'Erro ao excluir alerta.' });
    }
});

// Marcar um alerta como lido
router.put('/alertas/:id/lido', async (req, res) => {
    const alertaId = req.params.id;
    const usuarioId = req.user.id_usuario; 

    try {
        const result = await Alertas.marcarLido(alertaId, usuarioId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao marcar alerta como lido:', error.message);
        res.status(500).json({ error: 'Erro ao marcar alerta como lido.' });
    }
});

//dashboard


router.get('/vagas/:escolaId/:ano', async (req, res) => {
    const escolaId = Number(req.params.escolaId) //converter para numero é essencial
    const ano = Number(req.params.ano) //converter para numero é essencial
    try {
        const escola = await Vagas.readAllSchoolVagas(escolaId, ano);
        res.json(escola)
    } catch (e) {
        console.log(e)
        res.status(500).send("error no servidor")
    }
})

router.get('/matriculas/:escolaId/:ano', async (req, res) => {
    const escolaId = Number(req.params.escolaId) //converter para numero é essencial
    const ano = Number(req.params.ano) //converter para numero é essencial

    try {
        const matriculas = await Vagas.readAllSchoolMatriculas(escolaId, ano);
        res.json(matriculas)
    } catch (e) {
        console.log(e)
        res.status(500).send("error no servidor")
    }
})


router.post('/cadastro', async (req, res) => {
    const data = req.body

    try {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send("há campos faltando")
        }
        const newUser = await Usuarios.create(req.body.email, req.body.senha)
        res.status(201).json(newUser)
    } catch (e) {
        console.log(e)
        res.status(500).send("error no servidor")
    }
})

router.post('/login', async (req, res) => {
    const data = req.body
    try {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send("há campos faltando")
        }
        const user = await Usuarios.readByEmail(req.body.email);
        if (!user) return res.status(400).send('usuario nao existe')
        if (user.senha === req.body.senha) {
            return res.status(200).send("logado")
        }
        res.status(401).send("credenciais incorretas")
    } catch (e) {
        console.log(e)
        res.status(500).send("error no servidor")
    }
})


export default router;
