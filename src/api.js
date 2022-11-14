const getfuel = () => {
    return fetch('/.netlify/functions/getfuel').then((response) => {
        return response.json();
    });
};

const gethours = () => {
    return fetch('/.netlify/functions/gethours').then((response) => {
        return response.json();
    });
};

const create = (data) => {
    return fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST',
    }).then((response) => {
        return response.json();
    });
};

const erase = (id) => {
    return fetch('/.netlify/functions/erase', {
        method: 'POST',
        body: JSON.stringify(id),
    }).then((response) => {
        return response.json();
    });
};

const edit = (id, data) => {
    //need to add id to end of the url so the backend can get it
    return fetch(`/.netlify/functions/edit/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
    });
};

const api = {
    getfuel,
    gethours,
    create,
    erase,
    edit,
};

export default api;
