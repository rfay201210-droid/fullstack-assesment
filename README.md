# Full-Stack Assessment: Paginated Library Catalog

A full-stack application built with **FastAPI** (Backend) and **Next.js** (Frontend with TypeScript & Tailwind CSS) featuring a paginated table view and complete API integration.

---

## 📁 Project Structure

```text
fullstack-app/
├── backend/
│   ├── main.py            # FastAPI application & paginated endpoint
│   └── venv/              # Python virtual environment (git-ignored)
└── frontend/
    ├── app/
    │   └── page.tsx       # Next.js App Router page (renders paginated catalog)
    ├── package.json       # Frontend dependencies
    └── ...
```

---

## 🚀 Ports Overview

| Component | Service | URL / Port |
| :--- | :--- | :--- |
| **Backend** | FastAPI / Uvicorn | `http://localhost:8000` |
| **API Docs** | Swagger UI | `http://localhost:8000/docs` |
| **Frontend** | Next.js App Router | `http://localhost:3000` |

---

## 🛠️ Prerequisites

Before starting, ensure you have the following installed on your machine:
* **Python 3.8+** ([Download Python](https://www.python.org/downloads/))
* **Node.js 18+** & **npm** ([Download Node.js](https://nodejs.org/))
* **Git** ([Download Git](https://git-scm.com/))

---

## ⚙️ Setup & Installation Instructions

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   * **Windows:**
     ```cmd
     python -m venv venv
     venv\Scripts\activate
     ```
   * **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install required Python packages:
   ```bash
   pip install fastapi uvicorn
   ```

---

### 2. Frontend Setup (Next.js)

1. Open a **new terminal window** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

---

## 🏃 How to Run the Application

Both servers must run simultaneously in separate terminal windows.

### Step 1: Start the Backend Server
In your first terminal (`backend` directory with `venv` activated):
```bash
python -m uvicorn main:app --reload --port 8000
```
* The backend API will start at **`http://localhost:8000`**.
* Interactive Swagger API documentation will be available at **`http://localhost:8000/docs`**.

### Step 2: Start the Frontend Server
In your second terminal (`frontend` directory):
```bash
npm run dev
```
* The Next.js frontend will start at **`http://localhost:3000`**.

### Step 3: View the Application
Open **`http://localhost:3000`** in your browser. You will see the paginated Library Catalog displaying 5 items per page with working **Previous** and **Next** navigation controls.

---

## 📤 How to Upload this Project to GitHub

Follow these steps to upload your repository to GitHub:

1. **Create a `.gitignore` file** in your root directory (`fullstack-app/`) to avoid pushing unnecessary files:
   ```text
   # Node
   node_modules/
   .next/

   # Python
   venv/
   __pycache__/
   *.pyc
   ```

2. **Initialize Git & Commit Files:**
   Open a terminal in the root `fullstack-app` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FastAPI + Next.js paginated catalog app"
   ```

3. **Create a New Repository on GitHub:**
   * Go to [GitHub](https://github.com/new) and log in.
   * Enter a repository name (e.g., `fullstack-pagination-assessment`).
   * Choose **Public** or **Private** and click **Create repository**.

4. **Link Local Repository to GitHub & Push:**
   Copy the commands provided by GitHub under *"…or push an existing repository from the command line"* and run them in your terminal:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

---

## 🧠 Architecture Scenario Answers

### 1. API Key Security & Placement
* **Problem:** Placing API keys directly in client-side frontend code exposes them publicly in source code and network requests, enabling unauthorized third parties to steal keys and exhaust usage quotas.
* **Solution:** API keys must always be stored in backend environment variables (e.g., `.env` files or platform secrets on Render/Vercel) and accessed strictly on the server side.

### 2. Protecting Paid Endpoint Calls
* **Solution:** Implement user authentication (e.g., JWT tokens or session cookies) along with rate-limiting middleware on the backend API. This ensures that only authenticated, authorized app users can trigger third-party API calls.

### 3. Cross-Origin Resource Sharing (CORS) Configuration
* **Problem:** The browser blocks cross-origin requests because the backend server is missing or misconfiguring CORS response headers.
* **Fix:** Update the backend (FastAPI) CORS middleware configuration to explicitly permit origin requests from the frontend domain (e.g., adding `https://your-app.vercel.app` to `allow_origins`).
