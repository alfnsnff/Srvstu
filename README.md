# FastAPI Backend & Next.js Frontend

This repository contains a simple setup for running a FastAPI backend and a Next.js frontend. 

## Prerequisites

Before you start, ensure you have the following installed on your system:
- Node.js (for running Next.js)
- Python (for running FastAPI)
- npm or yarn (for managing Node.js packages)

## Setup

1. **Clone the Repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Install Dependencies:**

    ```bash
    # Go to the backend directory and install Python dependencies
    cd backend
    pip install -r requirements.txt

    # Go to the frontend directory and install Node.js dependencies
    cd ../frontend
    npm install  # or yarn install
    ```

## Running the Backend

1. **Start the FastAPI Server:**

    ```bash
    # From the root directory
    cd backend
    uvicorn main:app --reload
    ```

2. **Access the FastAPI Swagger Documentation:**

    Once the server is running, you can access the API documentation at `http://localhost:8000/docs`.

## Running the Frontend

1. **Start the Next.js Development Server:**

    ```bash
    # From the root directory
    cd frontend
    npm run dev  # or yarn dev
    ```

2. **Access the Frontend Application:**

    Once the server is running, you can access the frontend application at `http://localhost:3000`.

## Folder Structure

- **backend/**: Contains the FastAPI backend code.
- **frontend/**: Contains the Next.js frontend code.

Feel free to modify the code and adapt it according to your needs!