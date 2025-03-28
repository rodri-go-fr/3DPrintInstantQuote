import axios from 'axios';

// API base URL - adjust this based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const uploadModel = async (file: File, options: any) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Add options to form data
  Object.keys(options).forEach(key => {
    formData.append(key, options[key]);
  });
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const getJobStatus = async (jobId: string) => {
  const response = await api.get(`/job/${jobId}`);
  return response.data;
};

export const getMaterials = async () => {
  const response = await api.get('/materials');
  return response.data;
};

export const updateMaterials = async (materialsData: any) => {
  const response = await api.post('/materials', materialsData);
  return response.data;
};

export const getAllJobs = async () => {
  const response = await api.get('/jobs');
  return response.data;
};

export const approveJob = async (jobId: string) => {
  const response = await api.post(`/job/${jobId}/approve`);
  return response.data;
};

export const rejectJob = async (jobId: string) => {
  const response = await api.post(`/job/${jobId}/reject`);
  return response.data;
};

export default api;
