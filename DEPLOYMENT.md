# Deployment Guide

This monorepo has two separate deployments: the React frontend (`Client/`) on Vercel and the Express backend (`Server/`) on a Node host.

## Frontend Deployment (Vercel)

### Setup

1. Push this repo to GitHub
2. Create a new project on [Vercel](https://vercel.com)
3. Select this repo and set the **Root Directory** to `Client/`
4. Add this environment variable:
   - `VITE_BASE_URL` = the public URL of your deployed backend (e.g., `https://bloggen-backend.herokuapp.com`)

### Build & Deploy

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Vercel will automatically run these on every push to the main branch

---

## Backend Deployment (Node Host: Render / Railway / Fly.io)

### Required Environment Variables

Set these on your hosting platform (see examples in `Server/.env.example`):

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | Get from [ImageKit Dashboard](https://imagekit.io) |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | Get from ImageKit Dashboard |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | `https://ik.imagekit.io/your-id` |
| `GEMINI_API_KEY` | Google Gemini API key | Get from [Google AI Studio](https://aistudio.google.com/app/apikeys) |
| `PORT` | Server port (optional) | `3000` (default) |

### Setup Instructions

#### Option 1: Deploy on Render

1. Go to [render.com](https://render.com) and sign up
2. Create a **New Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `Server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
   - **Environment**: Node
5. Add all environment variables from the table above
6. Click **Deploy**

#### Option 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Create a new project and connect your GitHub repo
3. Configure:
   - **Root Directory**: `Server`
   - **Start Command**: `npm run start`
4. Add environment variables in the Railway dashboard
5. Deploy

#### Option 3: Deploy on Fly.io

1. Install [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Run: `fly launch` in the `Server/` directory
3. Add environment variables to `fly.toml`
4. Run: `fly deploy`

---

## Getting Your API Keys

### ImageKit (for image uploads)
1. Sign up at [imagekit.io](https://imagekit.io)
2. Go to Settings → API Keys
3. Copy **Public Key**, **Private Key**, and **URL Endpoint**

### Google Gemini API (for AI blog generation)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Create a new API key
3. Copy and save it securely

### MongoDB (database)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get the connection string and add `?retryWrites=true&w=majority`

---

## Verifying Deployment

Once both are deployed:

1. Open the Vercel frontend URL in your browser
2. Try to log in or create a blog
3. Check Vercel's **Function Logs** if you see errors
4. Check your Node host's logs for backend errors

If you see `500: INTERNAL_SERVER_ERROR`, it's usually a missing environment variable on the backend.
