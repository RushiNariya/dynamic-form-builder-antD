import axios from 'axios';
import toast from 'react-hot-toast';

// Axios Instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL,
});

// Request interceptor

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token != null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor and error handling
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else if (!error.response) {
      toast.error('Network error');
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      // localStorage.removeItem("user");
    }
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.reload();
    } else {
      // toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

export default instance;
