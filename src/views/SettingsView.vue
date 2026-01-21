<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '../components/AppLayout.vue';

const notifications = ref(true);
const darkMode = ref(true);
const language = ref('en');
</script>

<template>
  <AppLayout>
    <div class="settings-page">
      <!-- Header -->
      <header class="page-header">
        <h1>Settings</h1>
        <p class="subtitle">Customize your experience</p>
      </header>

      <!-- Preferences Section -->
      <section class="settings-section">
        <div class="section-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <h3>Preferences</h3>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Enable Notifications</span>
              <span class="setting-description">Receive email notifications for updates</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="notifications" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Dark Mode</span>
              <span class="setting-description">Use dark theme throughout the app</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="darkMode" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Language</span>
              <span class="setting-description">Select your preferred language</span>
            </div>
            <select v-model="language" class="select-input">
              <option value="en">English</option>
              <option value="zh-TW">繁體中文</option>
              <option value="zh-CN">简体中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Account Section -->
      <section class="settings-section">
        <div class="section-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <h3>Account</h3>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Change Password</span>
              <span class="setting-description">Update your account password</span>
            </div>
            <button class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Change
            </button>
          </div>

          <div class="setting-item">
            <div class="setting-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Email Address</span>
              <span class="setting-description">Change your email address</span>
            </div>
            <button class="action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Change
            </button>
          </div>

          <div class="setting-item">
            <div class="setting-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Export Data</span>
              <span class="setting-description">Download a copy of your data</span>
            </div>
            <button class="action-btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export
            </button>
          </div>
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="settings-section danger-zone">
        <div class="section-header danger">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <h3>Danger Zone</h3>
        </div>

        <div class="settings-list">
          <div class="setting-item danger">
            <div class="setting-icon danger">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>
            <div class="setting-info">
              <span class="setting-label">Delete Account</span>
              <span class="setting-description">Permanently delete your account and all associated data</span>
            </div>
            <button class="action-btn danger">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<style scoped>
.settings-page {
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

/* Settings Section */
.settings-section {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.settings-section.danger-zone {
  border-color: rgba(239, 68, 68, 0.3);
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

.section-header.danger svg {
  color: var(--danger);
}

.section-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

/* Settings List */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.setting-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.setting-item:hover {
  background: var(--glass-bg-light);
}

.setting-item.danger {
  border-color: rgba(239, 68, 68, 0.3);
}

.setting-item.danger:hover {
  border-color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
}

.setting-icon {
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

.setting-icon.danger {
  background: var(--danger-light);
  color: var(--danger);
}

.setting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
}

.setting-label {
  color: var(--text-primary);
  font-weight: 500;
}

.setting-description {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  flex-shrink: 0;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-fast);
  border-radius: var(--radius-full);
}

.slider::before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: var(--text-secondary);
  transition: all var(--transition-fast);
  border-radius: var(--radius-full);
}

.toggle input:checked + .slider {
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  border-color: transparent;
}

.toggle input:checked + .slider::before {
  transform: translateX(24px);
  background-color: white;
}

.toggle:hover .slider {
  border-color: var(--primary-light);
}

/* Select Input */
.select-input {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  min-width: 140px;
}

.select-input:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
}

.select-input option {
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Action Button */
.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.action-btn.secondary {
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  box-shadow: none;
}

.action-btn.secondary:hover {
  background: var(--glass-bg-light);
  border-color: var(--primary-light);
  transform: translateY(-1px);
}

.action-btn.danger {
  background: var(--danger);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.action-btn.danger:hover {
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

@media (max-width: 640px) {
  .setting-item {
    flex-wrap: wrap;
  }

  .setting-info {
    flex-basis: calc(100% - 56px);
  }

  .toggle,
  .select-input,
  .action-btn {
    margin-left: 56px;
    margin-top: var(--spacing-sm);
  }
}
</style>
