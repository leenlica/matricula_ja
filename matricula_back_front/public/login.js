import API from './api.js'; // ajuste o caminho conforme necessário

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = Object.fromEntries(new FormData(form));

    try {
        const response = await API.login(inputs); // Chamando a função de login

        // Mapeamento de perfil_id para URLs
        const perfilRedirects = {
            1: 'alertas.html',           // Admin
            2: '/tela-estudante.html',   // Estudante
            3: 'dashboard.html',         // Escola
            4: 'alertas.html',           // Gestor
        };

        const redirectUrl = perfilRedirects[response.perfil_id];

        if (redirectUrl) {
            // Redirecionar para a tela correspondente
            window.location.href = redirectUrl;
        } else {
            alert('Perfil não reconhecido');
        }
    } catch (error) {
        if (error.message.includes('400')) {
            alert('Usuário não existe');
        } else if (error.message.includes('401')) {
            alert('Credenciais incorretas');
        } else {
            alert('Erro no servidor');
        }
        console.error('Erro ao fazer login:', error);
    }
});
