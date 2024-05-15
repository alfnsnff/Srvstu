from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with your frontend's URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/api/home")
def read_home():
    return {"Name": "Asep"}

@app.get("/api/toppicks")
def read_toppicks():
    return {"Top Picks": ["Jett", "Raze", "Omen", "Clove", "Sova"]}

@app.get("/api/topmaps")
def read_topmaps():
    return {"Top Map": ["Lotus", "Ascent", "Pearl", "Sunset"]}

