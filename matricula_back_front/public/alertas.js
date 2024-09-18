import API from './api.js';

async function emitirAlerta(titulo, descricao, usuarios) {
    const alertData = {
        titulo,
        descricao,
        usuarios: usuarios || []
    };

    try {
        const resposta = await API.create('/alertas', alertData);
        alert('Alerta emitido com sucesso. ID do alerta: ' + resposta.id);
    } catch (error) {
        console.error('Erro ao emitir alerta:', error);
        alert('Erro ao emitir alerta: ' + (error.message || 'Erro desconhecido'));
    }
}

document.getElementById('alertForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const titulo = document.getElementById('title').value;
    const descricao = document.getElementById('description').value;

    const destinatarioAluno = document.getElementById('destinatarioAluno').checked;
    let usuarios = [];

    if (destinatarioAluno) {
        const idAluno = document.getElementById('idAluno').value;
        if (idAluno) {
            usuarios = [idAluno];
        } else {
            alert('Por favor, insira o ID do aluno.');
            return;
        }
    }

    if (!titulo || !descricao) {
        alert('Título e descrição são obrigatórios.');
        return;
    }

    try {
        await emitirAlerta(titulo, descricao, usuarios);
    } catch (error) {
        console.error('Erro ao emitir alerta:', error);
        alert('Erro ao emitir alerta');
    }
});

document.cookie = "name=value; SameSite=Lax; Secure";
