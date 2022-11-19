const faunadb = require('faunadb');
const q = faunadb.query;

//edit.js adds new entries to an hourly log and allows for the editing existing ones

//regex returns just the id
function getKey(path) {
    return path.match(/([^\/]*)\/*$/)[0];
}
exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    const data = JSON.parse(event.body);
    const id = getKey(event.path);
    console.log('Function edit invoked.', id);

    const log = {
        data: data,
    };
    
    return client
        .query(q.Update(q.Ref(q.Collection('hours'), id), log))
        .then((response) => {
            console.log('success', response);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
