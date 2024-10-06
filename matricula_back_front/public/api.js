const domain = 'http://localhost:3000'; 

// Função para login
async function login(data) {
    return await create('/login', data);
}
//create
async function create(resource, data) {
    const url = `${domain}${resource}`;
    const config = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    const res = await fetch(url, config);
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
}

//read
async function read(resource) {
    const url = `${domain}${resource}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
}

//update
async function update(resource, data) {
    const url = `${domain}${resource}`;
    const config = {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    const res = await fetch(url, config);
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
}
//delete
async function remove(resource) {
    const url = `${domain}${resource}`;
    const config = {
        method: 'DELETE',
        mode: 'cors',
    };

    const res = await fetch(url, config);
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
}

// Marcar um alerta como lido (PUT /alertas/:id/lido)
async function marcarAlertaComoLido(alertaId) {
    return await request(`/alertas/${alertaId}/lido`, 'PUT');
}

export default { create, read, update, remove, marcarAlertaComoLido, login };
