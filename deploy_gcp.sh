#!/bin/bash
echo "🚀 Starting RailAudit Deployment to Google Cloud Platform..."

# Configuration
PROJECT_ID="railaudit-live-demo-v1"
REGION="us-central1"
BUCKET_NAME="railaudit-artifacts-${PROJECT_ID}"

# Stop script on first error
set -e

echo "⚠️  IMPORTANT: Ensure BILLING is enabled for project: $PROJECT_ID"
echo "If billing is not enabled, Cloud Build and Cloud Run will fail."
echo "--------------------------------------"

echo "Project: $PROJECT_ID"
echo "Region: $REGION"

# 1. Enable Required Services
echo "--------------------------------------"
echo "🔌 Enabling Cloud Run, Cloud Build, and artifact Registry..."
echo "--------------------------------------"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com storage.googleapis.com

# 2. Create Cloud Storage Bucket (if not exists)
echo "--------------------------------------"
echo "📦 Checking/Creating Cloud Storage Bucket..."
echo "--------------------------------------"
if ! gsutil ls -b gs://$BUCKET_NAME > /dev/null 2>&1; then
  gsutil mb -l $REGION gs://$BUCKET_NAME
  echo "Created bucket: gs://$BUCKET_NAME"
else
  echo "Bucket gs://$BUCKET_NAME already exists"
fi

# 3. Build & Deploy Backend (Cloud Build)
echo "--------------------------------------"
echo "🔨 Building Backend Container using Cloud Build..."
echo "--------------------------------------"
cd Backend
gcloud builds submit --tag gcr.io/$PROJECT_ID/railaudit-backend .

echo "🚀 Deploying Backend to Cloud Run..."
gcloud run deploy railaudit-backend \
    --image gcr.io/$PROJECT_ID/railaudit-backend \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars GEMINI_API_KEY="$GEMINI_API_KEY"

BACKEND_URL=$(gcloud run services describe railaudit-backend --platform managed --region $REGION --format 'value(status.url)')
echo "✅ Backend Live: $BACKEND_URL"

# 4. Build & Deploy Frontend (Cloud Build)
echo "--------------------------------------"
echo "🎨 Building Frontend Container using Cloud Build..."
echo "--------------------------------------"
cd ../railaudit-dashboard
# Inject Backend URL into build env if needed by creating a .env.production dynamically
# echo "REACT_APP_API_URL=$BACKEND_URL" > .env.production

gcloud builds submit --tag gcr.io/$PROJECT_ID/railaudit-frontend .

echo "🚀 Deploying Frontend to Cloud Run..."
gcloud run deploy railaudit-frontend \
    --image gcr.io/$PROJECT_ID/railaudit-frontend \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated

FRONTEND_URL=$(gcloud run services describe railaudit-frontend --platform managed --region $REGION --format 'value(status.url)')

echo "--------------------------------------"
echo "🎉 Deployment Complete!"
echo "--------------------------------------"
echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"
echo "Artifact Bucket: gs://$BUCKET_NAME"
