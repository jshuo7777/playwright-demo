<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import AppLayout from '../components/AppLayout.vue';

const { user } = useAuth();
</script>

<template>
  <AppLayout>
    <div class="profile-page">
      <!-- Header -->
      <header class="page-header">
        <h1>Profile</h1>
        <p class="subtitle">Manage your account information</p>
      </header>

      <!-- Profile Card -->
      <div class="profile-card">
        <div class="profile-avatar">
          <div class="avatar">
            {{ user?.username?.charAt(0).toUpperCase() }}
          </div>
          <div class="avatar-glow"></div>
        </div>
        <div class="profile-info">
          <h2>{{ user?.username }}</h2>
          <p class="email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {{ user?.username }}@example.com
          </p>
          <span class="status-badge">
            <span class="status-dot"></span>
            Active
          </span>
        </div>
      </div>

      <!-- Account Information -->
      <section class="info-section">
        <div class="section-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <h3>Account Information</h3>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="label">Username</span>
              <span class="value">{{ user?.username }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="label">Member Since</span>
              <span class="value">January 2024</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="label">Account Status</span>
              <span class="value status-active">
                <span class="status-indicator"></span>
                Active
              </span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="label">Security</span>
              <span class="value">Password Protected</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Activity Section -->
      <section class="info-section">
        <div class="section-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <h3>Recent Activity</h3>
        </div>

        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon login">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </div>
            <div class="activity-content">
              <span class="activity-title">Logged in</span>
              <span class="activity-time">Just now</span>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div class="activity-content">
              <span class="activity-title">Profile updated</span>
              <span class="activity-time">2 days ago</span>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon settings">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <div class="activity-content">
              <span class="activity-title">Settings changed</span>
              <span class="activity-time">1 week ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
}

/* Header */
.page-header {
  margin-bottom: var(--spacing-xl);
}

.page-header h1 {
  color: var(--text-primary);
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-xs);
}

.subtitle {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
}

/* Profile Card */
.profile-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
}

.profile-avatar {
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.avatar-glow {
  position: absolute;
  inset: -4px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  opacity: 0.3;
  filter: blur(12px);
  z-index: 0;
}

.profile-info h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-sm);
}

.email {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-md);
  font-size: 0.9375rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--success-light);
  color: var(--success);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--success);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Info Section */
.info-section {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--glass-border);
}

.section-header svg {
  color: var(--primary-light);
}

.section-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.info-item:hover {
  background: var(--glass-bg-light);
  border-color: var(--primary-light);
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
}

.label {
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  color: var(--text-primary);
  font-weight: 500;
}

.value.status-active {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--success);
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--success);
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.activity-item:hover {
  background: var(--glass-bg-light);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.login {
  background: var(--success-light);
  color: var(--success);
}

.activity-icon.edit {
  background: var(--info-light);
  color: var(--info);
}

.activity-icon.settings {
  background: var(--warning-light);
  color: var(--warning);
}

.activity-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.activity-title {
  color: var(--text-primary);
  font-weight: 500;
}

.activity-time {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

@media (max-width: 640px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
  }

  .email {
    justify-content: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .activity-content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
