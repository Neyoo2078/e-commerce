import axios from 'axios';

const base = 'http://localhost:5000';
export const url = base || process.env.REACT_APP_RENDER_URL;

export const Api = axios.create({ baseURL: `${url}/products` });

export const azios = axios.create({ baseURL: `${url}/cart` });
azios.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }
  return req;
});

export const users = axios.create({ baseURL: `${url}/user` });
users.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }
  return req;
});
