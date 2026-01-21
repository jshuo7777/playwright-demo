<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import AppDrawer from './AppDrawer.vue';

const router = useRouter();
const { user, logout } = useAuth();
const isDrawerOpen = ref(false);

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function closeDrawer() {
  isDrawerOpen.value = false;
}

async function handleLogout() {
  await logout();
  router.push('/login');
}
</script>

<template>
  <div class="app-layout">
    <!-- Top Navigation Bar -->
    <nav role="navigation" class="top-nav">
      <div class="nav-left">
        <button
          class="menu-toggle"
          @click="toggleDrawer"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div class="app-brand">
          <div class="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="url(#nav-logo-gradient)" />
              <path d="M9 14L12.5 17.5L19 10.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="nav-logo-gradient" x1="0" y1="0" x2="28" y2="28">
                  <stop stop-color="#667eea" />
                  <stop offset="1" stop-color="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span class="app-title">Dashboard</span>
        </div>
      </div>

      <div class="nav-right">
        <div class="user-info">
          <div class="user-avatar">
            {{ user?.username?.charAt(0).toUpperCase() }}
          </div>
          <span class="user-name">{{ user?.username }}</span>
        </div>
        <button class="logout-btn" @click="handleLogout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </nav>

    <!-- Drawer -->
    <AppDrawer :is-open="isDrawerOpen" @close="closeDrawer" />

    <!-- Main Content -->
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-lg);
  height: 64px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.menu-toggle {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.menu-toggle:hover {
  background: var(--glass-bg-light);
  border-color: var(--primary-light);
}

.app-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon {
  display: flex;
  align-items: center;
}

.logo-icon svg {
  filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3));
}

.app-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--primary-light), var(--text-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.user-name {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--danger-light);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.logout-btn:hover {
  background: var(--danger);
  color: white;
  border-color: var(--danger);
}

.main-content {
  flex: 1;
  padding: var(--spacing-xl);
}

@media (max-width: 640px) {
  .user-name,
  .logout-btn span {
    display: none;
  }

  .app-title {
    display: none;
  }
}
</style>
