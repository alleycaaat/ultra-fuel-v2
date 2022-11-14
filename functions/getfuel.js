const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: 'fnAEwTTlCjAAS9hlkAW4EzdgPdeuB1Jtg2c2v7RT',
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    return client
        .query(q.Paginate(q.Match(q.Ref('indexes/all_fuel'))))
        .then((response) => {
            const fuelRefs = response.data;
            const getQuery = fuelRefs.map((ref) => {
                return q.Get(ref);
            });
            return client.query(getQuery).then((ret) => {
                /* Victory! */
                return {
                    statusCode: 200,
                    body: JSON.stringify(ret),
                };
            });
        })
        .catch((error) => {
            /* D'aw crap */
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
