const getFuel = async () => {
    let response = await fetch('/.netlify/functions/getfuel');
    let data = await response.json();

    return data;
};

const gethours = async () => {
    return fetch('/.netlify/functions/gethours')
        .then(response => {
            return response.json();
        });
};

const create = async (data) => {
    return fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST',
    }).then(response => {
        return response.json();
    });
};

const erase = async (id) => {
    return fetch('/.netlify/functions/erase', {
        method: 'DELETE',
        body: JSON.stringify(id),
    }).then(response => {
        return response.json();
    });
};

const edit = async (id, data) => {
    return fetch(`/.netlify/functions/edit/${ id }`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    });
};

export { getFuel, edit, erase, create, gethours };