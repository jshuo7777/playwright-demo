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
    <div class="login-card">
      <h1>Login</h1>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="errors.general" role="alert" class="error-alert">
          {{ errors.general }}
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            autocomplete="username"
            :class="{ 'input-error': errors.username }"
          />
          <span v-if="errors.username" class="field-error">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            :class="{ 'input-error': errors.password }"
          />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <button type="submit" :disabled="isLoading" class="login-button">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="demo-hint">
        <p>Demo credentials:</p>
        <code>testuser / password123</code>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-weight: 500;
  color: #555;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

input.input-error {
  border-color: #e53e3e;
}

.field-error {
  color: #e53e3e;
  font-size: 0.875rem;
}

.error-alert {
  background: #fed7d7;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
}

.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.login-button:hover:not(:disabled) {
  opacity: 0.9;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.demo-hint {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
}

.demo-hint code {
  display: block;
  margin-top: 0.5rem;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
}
</style>
