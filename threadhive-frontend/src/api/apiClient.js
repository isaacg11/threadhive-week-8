import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = "https://w04-mls.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});

export const fetchAPI = (endpoint, options = {}) => {
  const { body, ...rest } = options;

  return apiClient.request({
    url: endpoint,
    ...rest,
    data: typeof body === 'string' ? JSON.parse(body) : body,
  });
};

export default apiClient;
