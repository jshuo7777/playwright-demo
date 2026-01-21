import { ref, computed } from 'vue';

interface User {
  username: string;
}

const API_BASE = '/api';

// Reactive state
const user = ref<User | null>(null);
const sessionId = ref<string | null>(null);

// Initialize from localStorage on load
const initAuth = () => {
  const storedSession = localStorage.getItem('sessionId');
  const storedUser = localStorage.getItem('user');
  if (storedSession && storedUser) {
    try {
      sessionId.value = storedSession;
      user.value = JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('user');
    }
  }
};

// Initialize on module load
initAuth();

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        user.value = data.user;
        sessionId.value = data.sessionId;
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }

      return { success: false, error: data.error || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'X-Session-Id': sessionId.value || '',
        },
      });
    } catch {
      // Ignore errors during logout
    }

    user.value = null;
    sessionId.value = null;
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
  };

  const getUser = () => user.value;

  const getSessionId = () => sessionId.value;

  return {
    user: computed(() => user.value),
    isAuthenticated,
    login,
    logout,
    getUser,
    getSessionId,
  };
}
