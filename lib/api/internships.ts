import API from './axios';
import type { Application } from '@/lib/types';

// GET all applications
export const getApplications = async (): Promise<Application[]> => {
  const response = await API.get('/api/applications');
  // Map backend data to frontend format
  return response.data.map((item: any) => ({
    id: item.id,
    company: item.company,
    role: item.role,
    status: item.status,
    location: item.location || '',
    stipend: item.stipend || '',
    createdAt: new Date().toISOString(),
  }));
};

// POST new application
export const addApplication = async (data: Partial<Application>) => {
  const response = await API.post('/api/applications', {
    company: data.company,
    role: data.role,
    status: data.status,
    location: data.location || '',
    stipend: data.stipend || '',
  });
  return response.data;
};

// DELETE application
export const deleteApplication = async (id: string) => {
  const response = await API.delete(`/api/applications/${id}`);
  return response.data;
};

// PATCH update status
// AFTER
export const updateApplication = async (id: string, status: Application["status"]) => {
  const response = await API.patch(`/api/applications/${id}`, { status });
  return response.data;
};