import axios from 'axios';

const API_URL = 'http://localhost:8080/api/memberships';

export const getAllPlans = () => axios.get(API_URL);
export const getPlanById = (id) => axios.get(`${API_URL}/${id}`);
export const createPlan = (plan) => axios.post(API_URL, plan);
export const updatePlan = (id, plan) => axios.put(`${API_URL}/${id}`, plan);
export const deletePlan = (id) => axios.delete(`${API_URL}/${id}`);
export const togglePlanStatus = (id) => axios.patch(`${API_URL}/${id}/toggle-status`);
