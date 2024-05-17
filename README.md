# Srvstu

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
    # Go to the machine directory and install Python dependencies
    # Use virtual environment 
    cd machine
    python -m venv env-training
    venv\Scripts\activate
    pip install -r requirements.txt
    
    # Go to the backend directory and install Python dependencies
    # Use virtual environment 
    cd ../backend
    python -m venv env-deployment
    venv\Scripts\activate
    pip install -r requirements.txt

    # Go to the frontend directory and install Node.js dependencies
    cd ../frontend
    cp .env.example .env.local
    npm install  # or yarn install
    ```

3. **Download Datasets**
   Access the datasets source [here](https://www.kaggle.com/datasets/sadikaljarif/fruit-recognizer)
   We also add some additional images, access the fully complete dataset [here](#)
    
## Train the model

1. **Simply run the jupyter notebook to get the model**
     ```bash
    # From the root directory
    cd machine
    venv\Scripts\activate
    code . #Open on the Visual Studio Code
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

- **frontend/**: Contains the Machine Learning code.
- **backend/**: Contains the FastAPI backend code.
- **frontend/**: Contains the Next.js frontend code.

Feel free to modify the code and adapt it according to your needs! [Collaborators Only!!]
