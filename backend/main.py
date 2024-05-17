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

# Load the model
model = load_model('models/classify_fruit_model.keras')
 
@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = load_img(io.BytesIO(contents), target_size=(180, 180))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    
    prediction = model.predict(image)
    predicted_class = np.argmax(prediction, axis=1)
 
    class_names = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Carambola', 'Cherry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Lychee', 'Mango', 'Orange', 'Papaya', 'Pear', 'Pineapple', 'Raspberry', 'Strawberry', 'Watermelon']
    predicted_class_name = class_names[predicted_class[0]]
 
    return JSONResponse(content={'class': predicted_class_name})
