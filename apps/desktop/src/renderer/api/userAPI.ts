import axios, { AxiosInstance } from 'axios';

/**
 * API client for user operations.
 */
class UserAPI {
  private api: AxiosInstance;

  /**
   * Creates a user API client.
   * @param baseURL API base URL
   */
  constructor(baseURL: string = 'http://localhost:3000/api/v1') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = import.meta.env.VITE_API_TOKEN;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Fetches a paginated list of users.
   * @param page Page number
   * @param limit Items per page
   */
  async getUsers(page: number = 1, limit: number = 10) {
    return this.api.get('/get-users', {
      params: { page, limit }
    });
  }

  /**
   * Creates a new user.
   * @param userData User payload
   */
  async createUser(userData: { email: string; name: string; phone: string; birthday: string }) {
    return this.api.post('/add-user', userData);
  }
}

/**
 * Shared user API client instance.
 */
export const userAPI = new UserAPI();
