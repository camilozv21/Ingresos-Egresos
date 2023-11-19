import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://ingresos-egresos.vercel.app/api',
});

export default axiosConfig;