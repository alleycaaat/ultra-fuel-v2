export const GetItemId = (el) => {
    if (el.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    return el.ref['@ref'].id;
};