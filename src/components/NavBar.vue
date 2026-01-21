<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { user, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <span class="logo">Vue Demo</span>
    </div>

    <div class="navbar-menu">
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
    </div>

    <div class="navbar-end">
      <span data-testid="current-user" class="current-user">
        {{ user?.username }}
      </span>
      <button @click="handleLogout" class="logout-button">
        Logout
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.navbar-end {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-user {
  font-weight: 500;
}

.logout-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
