import { ref, computed } from 'vue';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
}

const API_BASE = '/api';

// Reactive state
const products = ref<Product[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useProducts() {
  const allProducts = computed(() => products.value);

  const fetchProducts = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      products.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      isLoading.value = false;
    }
  };

  const getProductById = (id: number): Product | undefined => {
    return products.value.find((p) => p.id === id);
  };

  const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE}/products/${id}`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch {
      return null;
    }
  };

  const createProduct = async (
    productData: Omit<Product, 'id' | 'createdAt'>
  ): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const newProduct = await response.json();
    products.value.push(newProduct);
    return newProduct;
  };

  const updateProduct = async (
    id: number,
    productData: Partial<Omit<Product, 'id' | 'createdAt'>>
  ): Promise<Product | null> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      return null;
    }

    const updatedProduct = await response.json();
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
    }
    return updatedProduct;
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return false;
    }

    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
    return true;
  };

  // Reset to initial state (useful for testing)
  const resetProducts = async (): Promise<void> => {
    await fetch(`${API_BASE}/products/reset`, {
      method: 'POST',
    });
    await fetchProducts();
  };

  return {
    products: allProducts,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchProducts,
    getProductById,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
  };
}
