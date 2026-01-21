<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { login } = useAuth();

const form = reactive({
  username: '',
  password: '',
});

const errors = reactive({
  username: '',
  password: '',
  general: '',
});

const isLoading = ref(false);

const validateForm = (): boolean => {
  let isValid = true;
  errors.username = '';
  errors.password = '';
  errors.general = '';

  if (!form.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  }

  if (!form.password.trim()) {
    errors.password = 'Password is required';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  errors.general = '';

  try {
    const result = await login(form.username, form.password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      errors.general = result.error || 'Login failed';
    }
  } catch (error) {
    errors.general = 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <!-- Decorative elements -->
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>

    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="url(#logo-gradient)" />
            <path d="M16 24L22 30L32 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48">
                <stop stop-color="#667eea" />
                <stop offset="1" stop-color="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1>Welcome Back</h1>
        <p class="subtitle">Sign in to continue to your dashboard</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="errors.general" role="alert" class="error-alert">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
          </svg>
          {{ errors.general }}
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Enter your username"
              autocomplete="username"
              :class="{ 'input-error': errors.username }"
            />
          </div>
          <span v-if="errors.username" class="field-error">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
            </svg>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              :class="{ 'input-error': errors.password }"
            />
          </div>
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <button type="submit" :disabled="isLoading" class="login-button">
          <span v-if="isLoading" class="loader"></span>
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="demo-hint">
        <p>Demo credentials</p>
        <div class="credentials">
          <code>testuser</code>
          <span class="separator">/</span>
          <code>password123</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  position: relative;
  overflow: hidden;
}

/* Floating orbs for glassmorphism effect */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.bg-orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -100px;
  left: -100px;
}

.bg-orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

.bg-orb-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  top: 50%;
  right: 20%;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

.login-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow);
  padding: var(--spacing-2xl);
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.logo {
  margin-bottom: var(--spacing-lg);
}

.logo svg {
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.4));
}

h1 {
  color: var(--text-primary);
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-sm);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

label {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

input {
  width: 100%;
  padding: var(--spacing-md);
  padding-left: calc(var(--spacing-md) + 28px);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

input::placeholder {
  color: var(--text-muted);
}

input:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
}

input.input-error {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px var(--danger-light);
}

.field-error {
  color: var(--danger);
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.error-alert {
  background: var(--danger-light);
  color: var(--danger);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.875rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.login-button {
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.demo-hint {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--glass-border);
  text-align: center;
}

.demo-hint p {
  color: var(--text-muted);
  font-size: 0.8125rem;
  margin: 0 0 var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.credentials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.credentials code {
  background: var(--glass-bg-light);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  color: var(--primary-light);
  border: 1px solid var(--glass-border);
}

.separator {
  color: var(--text-muted);
}
</style>
