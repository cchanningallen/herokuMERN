import 'isomorphic-fetch';

/**
 * Base method for making requests to the server.
 * @param uriFragment
 * @param method
 * @param data
 * @returns {Promise} .then() returns `result`
 */
function makeRequest(uriFragment='', method='GET', data) {
  const requestOpts = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (data) { requestOpts.body = JSON.stringify(data) }

  return fetch(`api/${uriFragment}`, requestOpts)
}

export default makeRequest;

export function getContacts() {
  return makeRequest('contacts')
}
