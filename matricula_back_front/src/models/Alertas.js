import prisma from '../database/database.js';

async function create(titulo, descricao) {
    try {
        if (!titulo || !descricao) {
            throw new Error('Título e descrição são obrigatórios.');
        }

        const result = await prisma.alerta.create({
            data: {
                titulo: titulo,
                descricao: descricao,
            },
        });

        return { id: result.id_alerta, message: 'Alerta criado com sucesso.' };
    } catch (error) {
        console.error('Erro ao criar alerta:', error.message);
        throw error;
    }
}

async function update(alertaId, titulo, descricao) {
    try {
        if (!titulo || !descricao) {
            throw new Error('Título e descrição são obrigatórios.');
        }

        const result = await prisma.alerta.update({
            where: { id_alerta: alertaId },
            data: {
                titulo: titulo,
                descricao: descricao,
            },
        });

        return { message: 'Alerta atualizado com sucesso.' };
    } catch (error) {
        console.error('Erro ao atualizar alerta:', error.message);
        throw error;
    }
}

async function remove(alertaId) {
    try {
        await prisma.alerta.delete({
            where: { id_alerta: alertaId },
        });

        return { message: 'Alerta excluído com sucesso.' };
    } catch (error) {
        console.error('Erro ao excluir alerta:', error.message);
        throw error;
    }
}

async function marcarLido(alertaId, usuarioId) {
    try {
        await prisma.alertaUser.updateMany({
            where: {
                alerta_id: alertaId,
                usuario_id: usuarioId,
            },
            data: {
                lido: true,  
            },
        });

        return { message: 'Alerta lido.' };
    } catch (error) {
        console.error('Erro ao marcar alerta como lido:', error.message);
        throw error;
    }
}

async function read(alertaId) {
    try {
        const alerta = await prisma.alerta.findUnique({
            where: { id_alerta: alertaId },
            include: {
                AlertaUser: {
                    select: {
                        usuario_id: true,
                    },
                },
            },
        });

        if (!alerta) {
            throw new Error('Alerta não encontrado.');
        }

        alerta.usuarios = alerta.AlertaUser.map((al) => al.usuario_id);

        return alerta;
    } catch (error) {
        console.error('Erro ao ler alerta:', error.message);
        throw error;
    }
}

async function readAll() {
    try {
        const alertas = await prisma.alerta.findMany({
            include: {
                AlertaUser: {
                    select: {
                        usuario_id: true,
                    },
                },
            },
        });

        return alertas.map((alerta) => ({
            ...alerta,
            usuarios: alerta.AlertaUser.map((al) => al.usuario_id),
        }));
    } catch (error) {
        console.error('Erro ao listar alertas:', error.message);
        throw error;
    }
}

export default { create, update, remove, marcarLido, read, readAll }