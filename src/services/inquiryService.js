import api from './api';

const INQUIRIES_PATH = '/inquiries';

export const createInquiry = async (data) => {
  const response = await api.post(INQUIRIES_PATH, data);
  return response.data;
};

export const getMyInquiries = async (statusFilter = null) => {
  const params = statusFilter ? { status: statusFilter } : undefined;
  const response = await api.get(INQUIRIES_PATH, { params });
  return response.data;
};

export const getInquiryById = async (inquiryId) => {
  const response = await api.get(`${INQUIRIES_PATH}/${inquiryId}`);
  return response.data;
};

export const updateInquiryStatus = async (inquiryId, status) => {
  const response = await api.patch(`${INQUIRIES_PATH}/${inquiryId}/status`, { status });
  return response.data;
};

export const deleteInquiry = async (inquiryId) => {
  const response = await api.delete(`${INQUIRIES_PATH}/${inquiryId}`);
  return response.data;
};
