/* API methods will call /functions */

const getfuel = async () => {
    const response = await fetch('/.netlify/functions/getfuel');
    return await response.json();
};

const gethours = async () => {
    const response = await fetch('/.netlify/functions/gethours');
    return await response.json();
};

const create = async (data) => {
    const response = await fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST',
    });
    return await response.json();
};

const erase = async (id) => {
    const response = await fetch('/.netlify/functions/erase', {
        method: 'POST',
        body: JSON.stringify(id),
    });
    return await response.json();
};

const edit = async (id, data) => {
    //need to add id to end of the url so the backend can get it
    const response = await fetch(`/.netlify/functions/edit/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return await response.json();
};

const api = {
    getfuel,
    gethours,
    create,
    erase,
    edit,
};

export default api;
