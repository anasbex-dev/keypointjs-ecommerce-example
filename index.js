console.log('KeypointJS E-Commerce API - Starting...');
console.log('========================================');

import { KeypointJS, Keypoint } from 'keypointjs';
import { products } from './data/products.js';
import { orders } from './data/orders.js';

try {
  /* ======================
     INIT FRAMEWORK (DEV STYLE)
  ====================== */
  
  /* When requireKeypoint and strictMode are enabled, KeypointJS enforces full security validation including protocol, scope, policy, and rate limit checks.
This mode is recommended for production environments. */

  const api = new KeypointJS({
    requireKeypoint: false, // true/false
    strictMode: false,      // LET THE PROTOCOL & POLICY BE LOOSE false
    enableCORS: true,
    corsOrigins: ['*'],
    maxRequestSize: '10mb'
  });

  console.log('KeypointJS instance created (DEV MODE)');

  /* ======================
     CREATE TEST KEYPOINT
     (OPTIONAL, CREATE A SIMULATION)
  ====================== */

  const shopClient = new Keypoint({
    keyId: 'shop_client',
    secret: 'shop_secret',
    name: 'E-Commerce Dev Client',
    scopes: [
      'product:read',
      'order:create'
    ],
    protocols: ['http', 'https'], // NOT BEING A BLOCKER IN DEV
    rateLimit: {
      requests: 1000,
      window: 60
    }
  });

  await api.keypointStorage.set(shopClient);
  console.log('Dev keypoint created:', shopClient.keyId);

  /* ======================
     ROUTES
  ====================== */

  // API info
  api.get('/', (ctx) => ({
    status: 200,
    body: {
      service: 'KeypointJS E-Commerce API',
      version: '1.0.0',
      mode: 'development',
      protocol: ctx.protocol
    }
  }));

  // GET products
  api.get('/api/products', (ctx) => {
    return {
      status: 200,
      body: {
        success: true,
        data: products
      }
    };
  });

  // GET product detail
  api.get('/api/products/:id', (ctx) => {
    const product = products.find(p => p.id === ctx.params.id);

    if (!product) {
      return {
        status: 404,
        body: { error: 'Product not found' }
      };
    }

    return {
      status: 200,
      body: product
    };
  });

  // CREATE order
  api.post('/api/orders', (ctx) => {
    const { productId, quantity } = ctx.body || {};

    if (!productId || !quantity) {
      return {
        status: 400,
        body: { error: 'Invalid payload' }
      };
    }

    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
      return {
        status: 400,
        body: { error: 'Product unavailable' }
      };
    }

    product.stock -= quantity;

    const order = {
      id: `ORD-${Date.now()}`,
      productId,
      quantity,
      total: product.price * quantity,
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    return {
      status: 201,
      body: {
        success: true,
        order
      }
    };
  });

  /* ======================
     START SERVER
  ====================== */

  console.log('\nStarting server...');

  await api.listen(3000, 'localhost', () => {
    console.log('========================================');
    console.log('KEYPOINTJS E-COMMERCE API RUNNING');
    console.log('========================================');
    console.log('URL: http://localhost:3000');
    console.log('');
    console.log('DEV MODE (Example-style)');
    console.log('Keypoint validation: DISABLED');
    console.log('');
    console.log('Test:');
    console.log('curl http://localhost:3000/api/products');
    console.log('curl -X POST http://localhost:3000/api/orders');
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('========================================\n');
  });

  /* ======================
     GRACEFUL SHUTDOWN
  ====================== */

  process.on('SIGINT', async () => {
    console.log('\nShutting down...');
    await api.shutdown();
    console.log('Shutdown complete');
    process.exit(0);
  });

} catch (error) {
  console.error('FAILED TO START E-COMMERCE API');
  console.error(error.message);
}