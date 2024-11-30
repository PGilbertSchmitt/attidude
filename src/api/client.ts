import axios from 'axios';

const BASE_URL = 'http://104.185.74.120:8080';

export const Client = axios.create({
  baseURL: BASE_URL,
});
