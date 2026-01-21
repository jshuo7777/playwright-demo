import { ref, computed } from 'vue';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock user credentials for demo
const VALID_CREDENTIALS = {
  username: 'testuser',
  password: 'password123',
};

// Reactive state
const user = ref<User | null>(null);

// Initialize from localStorage on load
const initAuth = () => {
  const stored = localStorage.getItem('auth');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      user.value = parsed.user;
    } catch {
      localStorage.removeItem('auth');
    }
  }
};

// Initialize on module load
initAuth();

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock authentication
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      user.value = { username };
      localStorage.setItem('auth', JSON.stringify({ user: user.value }));
      return { success: true };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('auth');
  };

  const getUser = () => user.value;

  return {
    user: computed(() => user.value),
    isAuthenticated,
    login,
    logout,
    getUser,
  };
}
