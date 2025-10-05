# Vercel Deployment Guide - URGENT FIX NEEDED

## Current Issue: 404 NOT_FOUND + Build Error

Your Vercel deployment is failing because:
1. Vercel is building from repository root (not the frontend folder)
2. The command `cd frontend && npm install` fails because there's no frontend directory in the root context

## IMMEDIATE SOLUTION

### Step 1: Set Root Directory in Vercel (REQUIRED)
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `zynk-platform` project  
3. Go to **Settings** → **General**
4. Find **Root Directory** section
5. **CHANGE FROM:** `.` (current)
6. **CHANGE TO:** `frontend`
7. Click **Save**

### Step 2: Remove Custom Commands (Done)
The vercel.json now uses simple Next.js detection instead of custom commands.

### Step 3: Redeploy
After changing the Root Directory, trigger a new deployment:
- Push a small commit, OR
- Go to Deployments tab and click "Redeploy"

## Why This Fixes It

Setting Root Directory to `frontend` tells Vercel:
- Build context: `/frontend` folder (where package.json, src/, etc. are)
- Install command: `npm install` (no need for `cd frontend`)
- Build command: `npm run build` (runs in frontend context)
- Output: `.next` folder (relative to frontend)

## Verification After Fix

Once deployed correctly:
- Main site: `https://your-app.vercel.app/` → Should show Next.js welcome page
- Health check: `https://your-app.vercel.app/api/health` → Should return JSON

## Current Build Log Error Explained
```
Running "install" command: `cd frontend && npm install`...
sh: line 1: cd: frontend: No such file or directory
```

This happens because Vercel is executing from repository root where there's no `frontend` folder - only when Root Directory is set to `frontend` will it execute commands from the correct location.