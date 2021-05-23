const { REACT_APP_URL } = process.env;
const baseUrl = REACT_APP_URL;


const fetchApi = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    switch (method) {
        case 'GET':
            return fetch(url, {
                method,
            });

        case 'POST':
            return fetch(url, {
                method,
                body: data
            });

        case 'DELETE':
            return fetch(url, {
                method,
            });

        default:
            return false;
    }
}

export {
    fetchApi,
}