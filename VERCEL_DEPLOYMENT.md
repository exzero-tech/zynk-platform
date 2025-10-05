# Vercel Deployment Guide

## Current Issue: 404 NOT_FOUND

Your Vercel deployment is returning 404 because it's trying to deploy from the repository root instead of the `frontend` folder.

## Solution Options

### Option 1: Set Root Directory in Vercel Dashboard (Recommended)
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `zynk-platform` project
3. Go to **Settings** → **General**
4. Find **Root Directory** section
5. Set it to: `frontend`
6. Click **Save**
7. Trigger a new deployment

### Option 2: Use the vercel.json Configuration
The repository now has a `vercel.json` at the root that tells Vercel:
- Build command: `cd frontend && npm run build`
- Install command: `cd frontend && npm install`
- Output directory: `frontend/.next`

## Verification Steps

After deployment:
1. Visit your deployed URL
2. Check the health endpoint: `https://your-app.vercel.app/api/health`
3. If you see `{"status":"ok","now":"..."}`, the deployment is working

## Troubleshooting

If you still get 404:
1. Check Vercel build logs for errors
2. Ensure the Root Directory is set to `frontend`
3. Verify the build completed successfully
4. Make sure no custom domains are misconfigured

## Quick Test
To test locally:
```bash
cd frontend
npm install
npm run build
npm start
```

Then visit http://localhost:3000 and http://localhost:3000/api/health

## Common Vercel Deployment Issues
- Root Directory not set correctly
- Build command fails (check logs)
- Environment variables missing
- Custom domain DNS issues