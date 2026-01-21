<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import { useProducts, type Product } from '../composables/useProducts';

const route = useRoute();
const router = useRouter();
const { fetchProductById, deleteProduct } = useProducts();

const productId = computed(() => Number(route.params.id));
const product = ref<Product | null>(null);
const isLoading = ref(true);

const showDeleteConfirm = ref(false);
const isDeleting = ref(false);

onMounted(async () => {
  isLoading.value = true;
  product.value = await fetchProductById(productId.value);
  isLoading.value = false;
});

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function openDeleteConfirm() {
  showDeleteConfirm.value = true;
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false;
}

async function confirmDelete() {
  isDeleting.value = true;
  const success = await deleteProduct(productId.value);
  isDeleting.value = false;

  if (success) {
    router.push('/products');
  }
}
</script>

<template>
  <AppLayout>
    <div class="product-detail-page">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Loading product...</p>
      </div>

      <!-- Product Content -->
      <template v-else-if="product">
        <header class="page-header">
          <div class="header-left">
            <RouterLink to="/products" class="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Products
            </RouterLink>
            <h1>{{ product.name }}</h1>
            <div class="product-meta">
              <span class="product-id">#{{ product.id }}</span>
              <span
                class="stock-badge"
                :class="{ low: product.stock < 50, medium: product.stock >= 50 && product.stock < 100 }"
              >
                {{ product.stock }} in stock
              </span>
            </div>
          </div>
          <div class="header-actions">
            <RouterLink :to="`/products/${product.id}/edit`" class="edit-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </RouterLink>
            <button class="delete-btn" @click="openDeleteConfirm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
              Delete
            </button>
          </div>
        </header>

        <div class="detail-content">
          <!-- Price Card -->
          <div class="price-card">
            <div class="price-label">Price</div>
            <div class="price-value">{{ formatPrice(product.price) }}</div>
          </div>

          <!-- Details Card -->
          <div class="detail-card">
            <h2>Product Details</h2>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                </div>
                <div class="detail-info">
                  <span class="label">Stock Quantity</span>
                  <span class="value">{{ product.stock }} units</span>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div class="detail-info">
                  <span class="label">Created Date</span>
                  <span class="value">{{ product.createdAt }}</span>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div class="detail-info">
                  <span class="label">Product ID</span>
                  <span class="value">#{{ product.id }}</span>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div class="detail-info">
                  <span class="label">Total Value</span>
                  <span class="value">{{ formatPrice(product.price * product.stock) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Description Card -->
          <div class="description-card">
            <h2>Description</h2>
            <p>{{ product.description }}</p>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeDeleteConfirm">
              <div class="modal">
                <div class="modal-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h3>Delete Product</h3>
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                <p class="product-name">"{{ product.name }}"</p>
                <div class="modal-actions">
                  <button class="cancel-btn" @click="closeDeleteConfirm" :disabled="isDeleting">
                    Cancel
                  </button>
                  <button class="confirm-btn" @click="confirmDelete" :disabled="isDeleting">
                    <span v-if="isDeleting" class="loader-small"></span>
                    {{ isDeleting ? 'Deleting...' : 'Delete' }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </template>

      <!-- Not Found -->
      <div v-else class="not-found">
        <div class="not-found-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <RouterLink to="/products" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Products
        </RouterLink>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.product-detail-page {
  max-width: 900px;
  margin: 0 auto;
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
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-light);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--text-primary);
}

.page-header h1 {
  color: var(--text-primary);
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.product-id {
  color: var(--text-muted);
  font-size: 0.875rem;
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

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.edit-btn,
.delete-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.edit-btn {
  background: var(--info-light);
  color: var(--info);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
  background: var(--info);
  color: white;
}

.delete-btn {
  background: var(--danger-light);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.delete-btn:hover {
  background: var(--danger);
  color: white;
}

/* Content */
.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.price-card {
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.price-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-sm);
}

.price-value {
  color: white;
  font-size: 3rem;
  font-weight: 700;
}

.detail-card,
.description-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.detail-card h2,
.description-card h2 {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-lg);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border-radius: var(--radius-md);
}

.detail-icon {
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

.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.detail-info .label {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

.detail-info .value {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.description-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.modal {
  background: var(--glass-bg-strong);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: var(--danger-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: var(--danger);
}

.modal h3 {
  color: var(--text-primary);
  font-size: 1.25rem;
  margin: 0 0 var(--spacing-md);
}

.modal p {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-sm);
  font-size: 0.9375rem;
}

.modal .product-name {
  color: var(--danger);
  font-weight: 600;
  margin-bottom: var(--spacing-xl);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.cancel-btn,
.confirm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.cancel-btn {
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
}

.cancel-btn:hover:not(:disabled) {
  background: var(--glass-bg-light);
}

.confirm-btn {
  background: var(--danger);
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  background: #dc2626;
}

.confirm-btn:disabled,
.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loader-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.95);
}

/* Not Found */
.not-found {
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

.not-found-icon {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-lg);
  background: var(--warning-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--warning);
  margin-bottom: var(--spacing-lg);
}

.not-found h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0 0 var(--spacing-sm);
}

.not-found p {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xl);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
  }

  .edit-btn,
  .delete-btn {
    flex: 1;
    justify-content: center;
  }

  .price-value {
    font-size: 2.5rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
