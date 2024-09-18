import API from './api.js'; 

async function emitirAlerta(titulo, descricao, usuarios) {
    const alertData = {
        titulo,
        descricao,
        usuarios: usuarios || [] // Garante que usuários é um array, mesmo que seja vazio
    };

    try {
        // Chama a função create do módulo API para a rota '/alertas'
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
    const destinatario = document.querySelector('input[name="destinatario"]:checked')?.id;
    const idAluno = destinatario === 'ialu' ? document.getElementById('ialu_id').value : null; // Ajuste o ID do campo

    // Define os usuários, se for caso de aluno específico
    const usuarios = destinatario === 'ialu' ? [idAluno] : [];

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
