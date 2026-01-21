<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import { useProducts } from '../composables/useProducts';

const route = useRoute();
const router = useRouter();
const { fetchProductById, createProduct, updateProduct } = useProducts();

const isEditMode = computed(() => route.params.id !== undefined);
const productId = computed(() => (isEditMode.value ? Number(route.params.id) : null));
const pageTitle = computed(() => (isEditMode.value ? 'Edit Product' : 'Add New Product'));

// Form state
const name = ref('');
const price = ref<number | string>('');
const stock = ref<number | string>('');
const description = ref('');

// Validation errors
const errors = ref<{
  name?: string;
  price?: string;
  stock?: string;
}>({});

const isSaving = ref(false);
const isLoading = ref(false);

// Load product data for edit mode
onMounted(async () => {
  if (isEditMode.value && productId.value) {
    isLoading.value = true;
    const product = await fetchProductById(productId.value);
    isLoading.value = false;
    if (product) {
      name.value = product.name;
      price.value = product.price;
      stock.value = product.stock;
      description.value = product.description;
    }
  }
});

function validateForm(): boolean {
  errors.value = {};

  if (!name.value.trim()) {
    errors.value.name = 'Product name is required';
  }

  if (price.value === '' || price.value === null) {
    errors.value.price = 'Price is required';
  } else if (Number(price.value) < 0) {
    errors.value.price = 'Price must be positive';
  }

  if (stock.value !== '' && Number(stock.value) < 0) {
    errors.value.stock = 'Stock must be positive';
  }

  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  if (!validateForm()) return;

  isSaving.value = true;

  const productData = {
    name: name.value.trim(),
    price: Number(price.value),
    stock: Number(stock.value) || 0,
    description: description.value.trim(),
  };

  try {
    if (isEditMode.value && productId.value) {
      await updateProduct(productId.value, productData);
      router.push(`/products/${productId.value}`);
    } else {
      await createProduct(productData);
      router.push('/products');
    }
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <AppLayout>
    <div class="product-form-page">
      <header class="page-header">
        <RouterLink to="/products" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Products
        </RouterLink>
        <h1>{{ pageTitle }}</h1>
        <p class="subtitle">{{ isEditMode ? 'Update product information' : 'Fill in the details to create a new product' }}</p>
      </header>

      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Loading product...</p>
      </div>

      <form v-else class="product-form" @submit.prevent="handleSubmit">
        <div class="form-section">
          <h2>Basic Information</h2>

          <div class="form-group">
            <label for="name">
              Product Name
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Enter product name"
                :class="{ error: errors.name }"
              />
            </div>
            <span v-if="errors.name" class="error-message">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {{ errors.name }}
            </span>
          </div>
        </div>

        <div class="form-section">
          <h2>Pricing & Inventory</h2>

          <div class="form-row">
            <div class="form-group">
              <label for="price">
                Price
                <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <span class="input-prefix">$</span>
                <input
                  id="price"
                  v-model="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="has-prefix"
                  :class="{ error: errors.price }"
                />
              </div>
              <span v-if="errors.price" class="error-message">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {{ errors.price }}
              </span>
            </div>

            <div class="form-group">
              <label for="stock">Stock Quantity</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <input
                  id="stock"
                  v-model="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  :class="{ error: errors.stock }"
                />
              </div>
              <span v-if="errors.stock" class="error-message">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {{ errors.stock }}
              </span>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Description</h2>

          <div class="form-group">
            <label for="description">Product Description</label>
            <textarea
              id="description"
              v-model="description"
              rows="4"
              placeholder="Enter a detailed description of the product..."
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <RouterLink to="/products" class="cancel-btn">
            Cancel
          </RouterLink>
          <button type="submit" class="save-btn" :disabled="isSaving">
            <span v-if="isSaving" class="loader-small"></span>
            {{ isSaving ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product') }}
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<style scoped>
.product-form-page {
  max-width: 700px;
  margin: 0 auto;
}

/* Header */
.page-header {
  margin-bottom: var(--spacing-xl);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-light);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color var(--transition-fast);
  margin-bottom: var(--spacing-md);
}

.back-link:hover {
  color: var(--text-primary);
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

/* Loading */
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

/* Form */
.product-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-section {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.form-section h2 {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--glass-border);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.required {
  color: var(--danger);
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

.input-prefix {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: var(--spacing-md);
  padding-left: calc(var(--spacing-md) + 28px);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

input.has-prefix {
  padding-left: calc(var(--spacing-md) + 16px);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
}

input.error,
textarea.error {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px var(--danger-light);
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
}

textarea {
  padding-left: var(--spacing-md);
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--danger);
  font-size: 0.8125rem;
  margin-top: var(--spacing-sm);
}

/* Actions */
.form-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  padding-top: var(--spacing-md);
}

.cancel-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--glass-bg);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  border: 1px solid var(--glass-border);
  transition: all var(--transition-fast);
}

.cancel-btn:hover {
  background: var(--glass-bg-light);
}

.save-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loader-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
  }
}
</style>
