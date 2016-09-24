const resData = res => res.json();

export const get = url => fetch(url).then(resData);

export const post = (url, data) => fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }).then(resData);

export const del = url => fetch(url, { method: 'DELETE' });

export const put = (url, data) => fetch(url, { method: 'PUT', body: JSON.stringify(data), headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }).then(resData);

export default (method, url, data) => fetch(url, { method: method, body: JSON.stringify(data), headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods': 'DELETE' } }).then(resData);
