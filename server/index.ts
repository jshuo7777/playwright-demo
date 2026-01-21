import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data.json');

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Data interfaces
interface User {
  username: string;
  password: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
}

interface DataStore {
  products: Product[];
  nextProductId: number;
}

// Load data from JSON file
function loadData(): DataStore {
  if (existsSync(DATA_FILE)) {
    try {
      const content = readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      throw new Error(`Failed to parse ${DATA_FILE}`);
    }
  }
  throw new Error(`Data file not found: ${DATA_FILE}`);
}

// Save data to JSON file
function saveData(data: DataStore): void {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Initialize data
let data = loadData();

// Mock users (kept in memory for simplicity)
const users: User[] = [
  { username: 'testuser', password: 'password123' },
];

// Simple session store
const sessions = new Map<string, { username: string }>();

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Auth routes
app.post('/api/auth/login', async (c) => {
  const body = await c.req.json();
  const { username, password } = body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return c.json({ success: false, error: 'Invalid username or password' }, 401);
  }

  const sessionId = generateSessionId();
  sessions.set(sessionId, { username: user.username });

  return c.json({
    success: true,
    user: { username: user.username },
    sessionId
  });
});

app.post('/api/auth/logout', async (c) => {
  const sessionId = c.req.header('X-Session-Id');
  if (sessionId) {
    sessions.delete(sessionId);
  }
  return c.json({ success: true });
});

app.get('/api/auth/me', (c) => {
  const sessionId = c.req.header('X-Session-Id');
  if (!sessionId || !sessions.has(sessionId)) {
    return c.json({ success: false, error: 'Not authenticated' }, 401);
  }

  const session = sessions.get(sessionId)!;
  return c.json({ success: true, user: { username: session.username } });
});

// Products routes
app.get('/api/products', (c) => {
  return c.json(data.products);
});

app.get('/api/products/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const product = data.products.find(p => p.id === id);

  if (!product) {
    return c.json({ error: 'Product not found' }, 404);
  }

  return c.json(product);
});

app.post('/api/products', async (c) => {
  const body = await c.req.json();
  const { name, price, stock, description } = body;

  const newProduct: Product = {
    id: data.nextProductId++,
    name,
    price,
    stock,
    description,
    createdAt: new Date().toISOString().split('T')[0],
  };

  data.products.push(newProduct);
  saveData(data);
  return c.json(newProduct, 201);
});

app.patch('/api/products/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();

  const index = data.products.findIndex(p => p.id === id);
  if (index === -1) {
    return c.json({ error: 'Product not found' }, 404);
  }

  data.products[index] = {
    ...data.products[index],
    ...body,
    id: data.products[index].id,
    createdAt: data.products[index].createdAt,
  };

  saveData(data);
  return c.json(data.products[index]);
});

app.delete('/api/products/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const index = data.products.findIndex(p => p.id === id);

  if (index === -1) {
    return c.json({ error: 'Product not found' }, 404);
  }

  data.products.splice(index, 1);
  saveData(data);
  return c.json({ success: true });
});

// Reset products to initial state (for testing)
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro',
    price: 1299.99,
    stock: 25,
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 49.99,
    stock: 150,
    description: 'Ergonomic wireless mouse with long battery life',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 129.99,
    stock: 75,
    description: 'RGB mechanical keyboard with Cherry MX switches',
    createdAt: '2024-02-01',
  },
  {
    id: 4,
    name: '4K Monitor',
    price: 599.99,
    stock: 30,
    description: '27-inch 4K UHD monitor with HDR support',
    createdAt: '2024-02-10',
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 79.99,
    stock: 200,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    createdAt: '2024-02-15',
  },
];

app.post('/api/products/reset', (c) => {
  data.products = [...initialProducts];
  data.nextProductId = 6;
  saveData(data);
  return c.json({ success: true, message: 'Products reset to initial state' });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);
console.log(`Data file: ${DATA_FILE}`);

serve({
  fetch: app.fetch,
  port,
});
