import axios from 'axios';

const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Train APIs ──────────────────────────────────────────────────────────────

export const listTrains = (includeLive = false) =>
  api.get('/trains/', { params: includeLive ? { include_live: true } : {} }).then(r => r.data);

export const getLiveTrains = (status) =>
  api.get('/trains/live', { params: status ? { status } : {} }).then(r => r.data);

export const searchTrains = (query) =>
  api.get('/trains/search', { params: { q: query } }).then(r => r.data);

export const getTrainStatus = (trainNo) =>
  api.get(`/trains/${trainNo}/status`).then(r => r.data);

export const getTrainLocation = (trainNo) =>
  api.get(`/trains/${trainNo}/location`).then(r => r.data);

export const getUpcomingStations = (trainNo) =>
  api.get(`/trains/${trainNo}/upcoming-stations`).then(r => r.data);

export const getETAPrediction = (trainNo) =>
  api.get(`/trains/${trainNo}/eta-prediction`).then(r => r.data);

export const getDelayHistory = (trainNo) =>
  api.get(`/trains/${trainNo}/delay-history`).then(r => r.data);

export default api;
