import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API utility functions
class ApiService {
  constructor() {
    this.token = localStorage.getItem('raasta_sathi_token');
    this.setupInterceptors();
  }

  // Setup axios interceptors
  setupInterceptors() {
    // Request interceptor to add auth token
    api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // Set auth token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('raasta_sathi_token', token);
    } else {
      localStorage.removeItem('raasta_sathi_token');
    }
  }

  // Generic request method
  async request(method, endpoint, data = null) {
    try {
      const config = {
        method,
        url: endpoint,
      };

      if (data) {
        config.data = data;
      }

      const response = await api(config);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data?.message || 'Server error occurred');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error - please check your connection');
      } else {
        // Something else happened
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  }

  // GET request
  async get(endpoint) {
    return this.request('GET', endpoint);
  }

  // POST request
  async post(endpoint, data) {
    return this.request('POST', endpoint, data);
  }

  // PUT request
  async put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  }

  // DELETE request
  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  }

  // Auth methods
  async register(userData) {
    const response = await this.post('/auth/register', userData);
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async login(credentials) {
    const response = await this.post('/auth/login', credentials);
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async logout() {
    this.setToken(null);
    return { status: 'success' };
  }

  async getCurrentUser() {
    return this.get('/auth/me');
  }

  async updateProfile(userData) {
    return this.put('/auth/updatedetails', userData);
  }

  // Reports methods
  async getReports(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/reports${queryString ? `?${queryString}` : ''}`);
  }

  async getReport(id) {
    return this.get(`/reports/${id}`);
  }

  async createReport(reportData) {
    return this.post('/reports', reportData);
  }

  async updateReport(id, reportData) {
    return this.put(`/reports/${id}`, reportData);
  }

  async deleteReport(id) {
    return this.delete(`/reports/${id}`);
  }

  async likeReport(id) {
    return this.post(`/reports/${id}/like`);
  }

  async addComment(id, comment) {
    return this.post(`/reports/${id}/comments`, { text: comment });
  }

  async voteReport(id, voteType) {
    return this.post(`/reports/${id}/vote`, { voteType });
  }

  async verifyReport(id) {
    return this.post(`/reports/${id}/verify`);
  }

  // Service requests methods
  async getServiceRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/services${queryString ? `?${queryString}` : ''}`);
  }

  async getMyServiceRequests() {
    return this.get('/services/my-requests');
  }

  async getProviderRequests(status = 'all') {
    return this.get(`/services/provider-requests?status=${status}`);
  }

  async createServiceRequest(requestData) {
    return this.post('/services', requestData);
  }

  async acceptServiceRequest(id, estimatedArrival) {
    return this.post(`/services/${id}/accept`, { estimatedArrival });
  }

  async startService(id) {
    return this.post(`/services/${id}/start`);
  }

  async completeService(id, finalPrice) {
    return this.post(`/services/${id}/complete`, { finalPrice });
  }

  async cancelServiceRequest(id, reason) {
    return this.post(`/services/${id}/cancel`, { reason });
  }

  async addServiceMessage(id, message, messageType = 'text') {
    return this.post(`/services/${id}/messages`, { message, messageType });
  }

  async rateService(id, rating, feedback) {
    return this.post(`/services/${id}/rate`, { rating, feedback });
  }

  // Users methods
  async getNearbyProviders(lat, lng, serviceType, radius = 15) {
    return this.get(`/users/providers/nearby?lat=${lat}&lng=${lng}&serviceType=${serviceType}&radius=${radius}`);
  }

  async updateNotificationSettings(settings) {
    return this.put('/users/notifications', settings);
  }

  async updateAvailability(isAvailable) {
    return this.put('/users/availability', { isAvailable });
  }

  // Leaderboard methods
  async getLeaderboard(timeframe = 'all', limit = 50) {
    return this.get(`/leaderboard?timeframe=${timeframe}&limit=${limit}`);
  }

  async getUserStats(userId) {
    return this.get(`/leaderboard/stats/${userId}`);
  }

  async getAchievements() {
    return this.get('/leaderboard/achievements');
  }

  // Notifications methods
  async getNotifications(page = 1, limit = 20, unreadOnly = false) {
    return this.get(`/notifications?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`);
  }

  async markNotificationAsRead(id) {
    return this.put(`/notifications/${id}/read`);
  }

  async markAllNotificationsAsRead() {
    return this.put('/notifications/read-all');
  }

  async deleteNotification(id) {
    return this.delete(`/notifications/${id}`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;