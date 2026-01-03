# KeypointJS E-Commerce API Example

Standalone E-Commerce REST API built with **KeypointJS**.  
No Express. No Fastify. No external web framework.

This repository demonstrates that **KeypointJS is a fully independent API framework**, not just an authentication or middleware library.

---

##  Features

- Standalone HTTP Server (no Express)
- Keypoint-based Authentication & Authorization
- Plugin-ready architecture
- Lightweight & modern
- E-Commerce API example
- Dev Mode & Strict Mode
- Zero database (in-memory demo)

---

## Tech Stack

- **Node.js (ESM)**
- **KeypointJS**
- Native HTTP server
- No Express / Fastify / Koa

---

##  Project Structure

```
keypointjs-ecommerce-example/
├── index.js
├── package.json
├── README.md
```

---

##  Installation

```bash
npm install
```

Or install KeypointJS manually:

```bash
npm install keypointjs
```

---

## Running the Server

```bash
node index.js
```

Server will start at:

```
http://localhost:3000
```

---

## Modes

###  Development Mode
- `requireKeypoint: false`
- `strictMode: false`
- Public access allowed

###  Strict / Production Mode
- `requireKeypoint: true`
- `strictMode: true`
- All requests must include valid Keypoint headers

---

##  Keypoint Headers (Strict Mode)

```
x-keypoint-id: shop_client
x-keypoint-secret: shop_secret
```

---

##  API Endpoints

### Get Products

```bash
curl http://localhost:3000/api/products
```

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": "p001",
      "name": "Anime Figure – Vash the Stampede",
      "price": 750000,
      "stock": 10
    }
  ]
}
```

---

### Create Order

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"p001","quantity":1}'
```

---

##  Why KeypointJS?

KeypointJS is designed as a **framework-level API engine**, not a middleware.

### Compared to Express-style frameworks:

| Feature | KeypointJS | Express |
|------|-----------|--------|
| Standalone Server | ✅ | ❌ |
| Built-in Security | ✅ | ❌ |
| Plugin System | ✅ | ❌ |
| Policy Engine | ✅ | ❌ |
| Key-based Identity | ✅ | ❌ |

---

##  Plugin System

KeypointJS supports:
- RateLimiter plugins
- Transformer plugins
- Policy-based plugins
- Scraper plugins (planned)

---

##  Purpose of This Repo

This repository exists to:
- Prove KeypointJS can run fully standalone
- Help developers understand KeypointJS architecture
- Serve as a real-world API simulation
- Build trust for contributors & adopters

---

##  License

Apache-2.0 license

---

##  Author

**AnasBex**  
Creator of KeypointJS

---

> KeypointJS is not built to compete with Express.  
> It is built to replace the need for it.
