const faunadb = require('faunadb');
require('dotenv').config();
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: 'fnAEwTTlCjAAS9hlkAW4EzdgPdeuB1Jtg2c2v7RT',
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    //remove quotes from id
    const id = event.body.replace(/"/g, '');

    console.log('Function delete invoked.', id);
    return client
        .query(q.Delete(q.Ref(q.Collection('recipes'), id)))
        .then((response) => {
            console.log('Success', response);
            /* Victory! */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('Error', error);
            /* D'aw crap */
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
