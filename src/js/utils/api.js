import axios from 'axios';

const resData = res => res.data;

export const get = url => axios.get(url).then(resData);

export const post = (url, data) => axios.post(url, data).then(resData);

export const del = url => axios.delete(url).then(resData);

export const put = (url, data) => axios.put(url, data).then(resData);

export default (method, url, data) => axios[method](url, data).then(resData);
