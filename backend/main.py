import io
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

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

# Load the model
model = load_model('classify_fruit_model.h5')
 
@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = load_img(io.BytesIO(contents), target_size=(180, 180))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    
    prediction = model.predict(image)
    predicted_class = np.argmax(prediction, axis=1)
 
    class_names = ['Apple', 'Grape', 'Kiwi', 'Orange', 'Pineapple', 'Papaya', 'Watermelon', 'Lemon', 'Avocado', 'Raspberry', 'Lychee', 'Pear', 'Carambola', 'Mango', 'Banana', 'Cherry', 'Strawberry', 'Fig', 'Blueberry', 'Apricot']
 
    return JSONResponse(content={'class': class_names[predicted_class[0]]})
