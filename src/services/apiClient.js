import axios from 'axios';

const PRODUCTION_API_URL = 'https://digi-hap.onrender.com';
const API_BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_URL || PRODUCTION_API_URL).replace(/\/$/, '');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export default apiClient;
