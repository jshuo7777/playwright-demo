<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import { useProducts } from '../composables/useProducts';

const { products, isLoading, fetchProducts } = useProducts();

onMounted(() => {
  fetchProducts();
});

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
</script>

<template>
  <AppLayout>
    <div class="products-page">
      <!-- Header -->
      <header class="page-header">
        <div class="header-content">
          <h1>Products</h1>
          <p class="subtitle">Manage your product inventory</p>
        </div>
        <RouterLink to="/products/new" class="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </RouterLink>
      </header>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Loading products...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h2>No products yet</h2>
        <p>Get started by adding your first product</p>
        <RouterLink to="/products/new" class="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </RouterLink>
      </div>

      <!-- Products Grid -->
      <div v-else class="products-grid">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="product-card"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <div class="product-header">
            <div class="product-id">#{{ product.id }}</div>
            <div
              class="stock-badge"
              :class="{ low: product.stock < 50, medium: product.stock >= 50 && product.stock < 100 }"
            >
              {{ product.stock }} in stock
            </div>
          </div>

          <div class="product-body">
            <RouterLink :to="`/products/${product.id}`" class="product-name">
              {{ product.name }}
            </RouterLink>
            <p class="product-description">{{ product.description }}</p>
          </div>

          <div class="product-footer">
            <div class="product-price">{{ formatPrice(product.price) }}</div>
            <div class="product-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {{ product.createdAt }}
            </div>
          </div>

          <div class="product-actions">
            <RouterLink :to="`/products/${product.id}/edit`" class="action-btn edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </RouterLink>
            <RouterLink :to="`/products/${product.id}`" class="action-btn view">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              View
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.header-content h1 {
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

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  color: white;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid var(--glass-border);
  border-top-color: var(--primary-light);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.empty-icon {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  margin-bottom: var(--spacing-lg);
}

.empty-state h2 {
  color: var(--text-primary);
  font-size: 1.25rem;
  margin: 0 0 var(--spacing-sm);
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xl);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

.product-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  transition: all var(--transition-normal);
}

.product-card:hover {
  background: var(--glass-bg-light);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-light);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-id {
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
}

.stock-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--success-light);
  color: var(--success);
}

.stock-badge.low {
  background: var(--danger-light);
  color: var(--danger);
}

.stock-badge.medium {
  background: var(--warning-light);
  color: var(--warning);
}

.product-body {
  flex: 1;
}

.product-name {
  display: block;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: color var(--transition-fast);
}

.product-name:hover {
  color: var(--primary-light);
}

.product-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-light), var(--primary-start));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-date {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-muted);
  font-size: 0.8125rem;
}

.product-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.action-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.action-btn.edit {
  background: var(--info-light);
  color: var(--info);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.action-btn.edit:hover {
  background: var(--info);
  color: white;
}

.action-btn.view {
  background: var(--glass-bg);
  color: var(--text-secondary);
  border: 1px solid var(--glass-border);
}

.action-btn.view:hover {
  background: var(--glass-bg-light);
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
