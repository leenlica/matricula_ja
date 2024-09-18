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

// Manipulador de eventos para o envio do formulário
document.getElementById('alertForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const titulo = document.getElementById('title').value;
    const descricao = document.getElementById('description').value;

    // Verifica qual opção de destinatário foi selecionada
    const destinatarioAluno = document.getElementById('destinatarioAluno').checked;
    let usuarios = [];

    if (destinatarioAluno) {
        const idAluno = document.getElementById('idAluno').value;
        if (idAluno) {
            usuarios = [idAluno]; // Se for um aluno específico, adiciona o ID do aluno
        } else {
            alert('Por favor, insira o ID do aluno.');
            return;
        }
    }

    // Verifica se todos os campos necessários foram preenchidos
    if (!titulo || !descricao) {
        alert('Título e descrição são obrigatórios.');
        return;
    }

    // Chama a função de emitir alerta com os dados do formulário
    try {
        await emitirAlerta(titulo, descricao, usuarios);
    } catch (error) {
        console.error('Erro ao emitir alerta:', error);
        alert('Erro ao emitir alerta');
    }
});

document.cookie = "name=value; SameSite=Lax; Secure";
