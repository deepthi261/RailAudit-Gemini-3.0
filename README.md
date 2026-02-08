# RailAudit Dashboard - Gemini 3.0 Workflow

This project is a local-first application designed to demonstrate an autonomous financial oversight system for the FRA.

## 🚀 Quick Start (Local)

This application runs in two parts: a Python Flask backend and a React frontend.

### Prerequisites
- Python 3.8+
- Node.js & npm
- Gemini API Key (in `Backend/.env`)

### 1. Start the Backend (Port 5001)
The backend handles the Gemini 3.0 Agent logic and 6-stage pipeline visualization.
```bash
cd Backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python server.py
# Running on http://localhost:5001
```

### 2. Start the Frontend (Port 3000)
The frontend provides the interactive "Gemini 3 Workflow" dashboard.
```bash
cd railaudit-dashboard
npm install
npm start
# Opens http://localhost:3000
```

## ☁️ Deployment to Google Cloud Platform (GCP)
This project includes an automated script (`deploy_gcp.sh`) to deploy the application to **Google Cloud Run** using **Cloud Build**.

### Prerequisites
1.  **Google Cloud Project**: Ensure you have a GCP project created and billing enabled.
2.  **gcloud CLI**: Installed and authenticated (`gcloud auth login`).

### Steps to Deploy
1.  **Make the script executable:**
    ```bash
    chmod +x deploy_gcp.sh
    ```
2.  **Run the script:**
    ```bash
    ./deploy_gcp.sh
    ```

The script will automatically:
*   Create a Cloud Storage bucket for artifacts.
*   Build your Docker containers remotely (no local Docker needed).
*   Deploy the Backend and Frontend to Cloud Run.
*   **Output the public URLs** for your application.

### 📁 Demo Data (For Hackathon)
I have created diverse datasets for your demo in the `Backend/datasets` folder:
1.  **`dataset_1_compliant.csv`**: Perfect Audit (Efficient OR, Tier 4 Compliant).
2.  **`dataset_2_high_expense.csv`**: Financial Warning (High Operating Ratio, Overtime variance).
3.  **`dataset_3_fuel_violation.csv`**: Regulatory Alert (EPA Tier 4 Non-Compliance).

## 🔗 "Public" Access
As this is a locally running prototype, there is no public URL (like `railaudit.ai`). The working product is accessible at:
https://railaudit-frontend-o7vz2fgdrq-uc.a.run.app/
- **Interactive Dashboard:** 
- **Backend Pipeline:** 
## 📦 Deployment Note
To make this public, you would typically deploy:
- **Frontend** to Vercel/Netlify.
- **Backend** to Google Cloud Run / Heroku.
- **AI Studio**: Alternatively, you can port the `railaudit.py` prompt logic directly into Google AI Studio for a text-based prototype.
