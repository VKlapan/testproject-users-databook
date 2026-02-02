import React, { useState, useEffect } from 'react';
import { userAPI } from '../api/userAPI';
import '../styles/Users.css';

/**
 * User entity returned by the API.
 */
interface User {
  _id: string;
  email: string;
  name: string;
}

/**
 * Paginated users response.
 */
interface UsersResponse {
  data: User[];
  total: number;
  currentPage: number;
  pages: number;
}

/**
 * Users management page.
 */
export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ email: '', name: '', phone: '', birthday: '' });
  const tokenLoaded = Boolean(import.meta.env.VITE_API_TOKEN);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  /**
   * Builds a user-facing error message from API responses.
   * @param err Unknown error
   * @param fallback Fallback message
   */
  const formatApiError = (err: unknown, fallback: string) => {
    const anyErr = err as { response?: { status?: number; data?: any }; message?: string };
    const status = anyErr?.response?.status;
    const data = anyErr?.response?.data;
    const messageFromApi =
      (typeof data === 'string' && data) ||
      (typeof data?.message === 'string' && data.message) ||
      (Array.isArray(data?.message) ? data.message.join(', ') : undefined);
    const details = messageFromApi || anyErr?.message;
    return status ? `${fallback} (HTTP ${status}${details ? `: ${details}` : ''})` : `${fallback}${details ? `: ${details}` : ''}`;
  };

  /**
   * Loads a paginated user list.
   * @param pageToLoad Page number
   */
  const fetchUsers = async (pageToLoad: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.getUsers(pageToLoad, limit);
      const data = response.data as UsersResponse;
      setUsers(data.data || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      setError(formatApiError(err, 'Failed to fetch users'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submits user creation form.
   * @param e Form event
   */
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.name || !newUser.phone || !newUser.birthday) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await userAPI.createUser(newUser);
      const created = response.data as Partial<User> | undefined;
      const createdName = created?.name ? `: ${created.name}` : '';
      setSuccess(`User created${createdName}`);
      setNewUser({ email: '', name: '', phone: '', birthday: '' });
      await fetchUsers(page);
    } catch (err) {
      setError(formatApiError(err, 'Failed to create user'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigates to previous page.
   */
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  /**
   * Navigates to next page.
   */
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="users-page">
      <h1>Users Management</h1>
      <p style={{ marginBottom: '10px', color: '#7f8c8d' }}>
        Token loaded: {tokenLoaded ? 'yes' : 'no'}
      </p>

      <form onSubmit={handleAddUser} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            placeholder="+380XXXXXXXXX"
            value={newUser.phone}
            onChange={(e) =>
              setNewUser({ ...newUser, phone: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <input
            id="birthday"
            type="text"
            placeholder="DD-MM-YYYY"
            value={newUser.birthday}
            onChange={(e) =>
              setNewUser({ ...newUser, birthday: e.target.value })
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-list">
          <h2>Users List (page {page} of {totalPages})</h2>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page <= 1}>
              Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
