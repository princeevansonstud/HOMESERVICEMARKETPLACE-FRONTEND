import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inquiries';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const createInquiry = async (data) => {
  const response = await api.post('', data);
  return response.data;
};


export const getMyInquiries = async (statusFilter = null) => {
  const params = statusFilter ? { status: statusFilter } : {};
  const response = await api.get('', { params });
  return response.data;
};


export const getInquiryById = async (inquiryId) => {
  const response = await api.get(`/${inquiryId}`);
  return response.data;
};


export const updateInquiryStatus = async (inquiryId, status) => {
  const response = await api.patch(`/${inquiryId}/status`, { status });
  return response.data;
};


export const deleteInquiry = async (inquiryId) => {
  const response = await api.delete(`/${inquiryId}`);
  return response.data;
};

export default api;