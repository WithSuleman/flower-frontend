import axios from 'axios';
import { sampleFlowers } from '../data/flowerData.js';

// Base API URL from environment variable, defaults to empty string for relative proxying in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Products API
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/api/products');
    return response.data;
  } catch (error) {
    console.warn('Backend API unavailable, using local floral product catalog fallback:', error.message);
    return sampleFlowers;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`Backend API unavailable for product ${id}, using local fallback:`, error.message);
    const found = sampleFlowers.find((p) => p._id === id || p.id === id);
    if (found) return found;
    throw error;
  }
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/api/orders', orderData);
    return response.data;
  } catch (error) {
    console.warn('Backend API unavailable for creating order, saving to local storage fallback:', error.message);
    // Create local order fallback
    const localOrder = {
      _id: 'ord-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...orderData,
    };
    const stored = JSON.parse(localStorage.getItem('bloomora_orders') || '[]');
    stored.unshift(localOrder);
    localStorage.setItem('bloomora_orders', JSON.stringify(stored));
    return localOrder;
  }
};

export const getOrders = async () => {
  try {
    const response = await apiClient.get('/api/orders');
    return response.data;
  } catch (error) {
    console.warn('Backend API unavailable for orders list, reading from local fallback:', error.message);
    const stored = JSON.parse(localStorage.getItem('bloomora_orders') || '[]');
    return stored;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  } catch (error) {
    const stored = JSON.parse(localStorage.getItem('bloomora_orders') || '[]');
    const found = stored.find((o) => o._id === id);
    if (found) return found;
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/api/health');
    return response.data;
  } catch {
    return { status: 'mock_mode', message: 'Bloomora local mock mode active' };
  }
};

export default apiClient;
