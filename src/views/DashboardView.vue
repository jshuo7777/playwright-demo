<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import { useAuth } from '../composables/useAuth';

const { user } = useAuth();

// Mock statistics for demo
const stats = ref({
  profileVisits: 1234,
  activeSessions: 3,
  totalLogins: 42,
  lastLogin: new Date().toLocaleDateString(),
});
</script>

<template>
  <div class="dashboard-layout">
    <NavBar />

    <main class="dashboard-content">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="welcome-message">Welcome, {{ user?.username }}</p>
      </header>

      <section aria-label="Statistics" class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Profile Visits</h3>
            <p class="stat-value">{{ stats.profileVisits }}</p>
          </div>

          <div class="stat-card">
            <h3>Active Sessions</h3>
            <p class="stat-value">{{ stats.activeSessions }}</p>
          </div>

          <div class="stat-card">
            <h3>Total Logins</h3>
            <p class="stat-value">{{ stats.totalLogins }}</p>
          </div>

          <div class="stat-card">
            <h3>Last Login</h3>
            <p class="stat-value">{{ stats.lastLogin }}</p>
          </div>
        </div>
      </section>

      <section class="activity-section">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-icon">📝</span>
            <span>Profile updated</span>
            <span class="activity-time">2 hours ago</span>
          </div>
          <div class="activity-item">
            <span class="activity-icon">🔐</span>
            <span>Password changed</span>
            <span class="activity-time">1 day ago</span>
          </div>
          <div class="activity-item">
            <span class="activity-icon">🚀</span>
            <span>Account created</span>
            <span class="activity-time">1 week ago</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #f5f7fa;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #333;
  margin: 0;
}

.welcome-message {
  color: #666;
  margin-top: 0.5rem;
}

.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.stat-value {
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.activity-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.activity-section h2 {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 4px;
}

.activity-icon {
  font-size: 1.25rem;
}

.activity-time {
  margin-left: auto;
  color: #999;
  font-size: 0.875rem;
}
</style>
