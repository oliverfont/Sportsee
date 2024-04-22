import axios from 'axios';

const baseURL = 'http://localhost:3000';

const api = axios.create({
  baseURL,
});

export const getUser = (userId) => {
  return api.get(`/user/${userId}`);
};

export const getUserMainData = (userId) => {
  return api.get(`/user/${userId}/mainData`);
}

export const getUserActivity = (userId) => {
  return api.get(`/user/${userId}/activity`);
};

export const getUserAverageSessions = (userId) => {
  return api.get(`/user/${userId}/average-sessions`);
};

export const getUserPerformance = (userId) => {
  return api.get(`/user/${userId}/performance`);
};

export default api;
