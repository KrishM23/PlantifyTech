from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf
import base64
import io
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
logging.basicConfig(level=logging.DEBUG)

# Define a simple model for demonstration purposes
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(3)  # Assuming we have 3 outputs for humidity, soil quality, and vegetation density
])

@app.route('/')
def home():
    app.logger.debug("Home route accessed")
    return "Server is running!"

@app.route('/assess', methods=['POST'])
def assess():
    try:
        app.logger.debug("Assess route accessed")
        data = request.get_json()
        image_data = data['image']
        app.logger.debug(f"Image data received: {image_data[:30]}...")  # Log the start of the image data
        image_data = image_data.split(",")[1]  # Remove the base64 header
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))

        # Resize the image to 28x28 (assuming this is the expected input size)
        image = image.resize((28, 28))
        image = image.convert('L')  # Convert to grayscale
        image = np.array(image)
        image = image / 255.0  # Normalize pixel values
        image = image.reshape(1, 28, 28)  # Reshape to match the model's input shape

        app.logger.debug(f"Processed image shape: {image.shape}")

        prediction = model.predict(image)
        app.logger.debug(f"Prediction: {prediction}")

        humidity = prediction[0][0] * 10
        soil_quality = prediction[0][1] * 10
        vegetation_density = prediction[0][2] * 10

        # Ensure should_plant_tree is a native Python boolean
        should_plant_tree = bool(humidity > 5 and soil_quality > 5 and vegetation_density > 5)

        return jsonify({
            'shouldPlantTree': should_plant_tree,
            'humidity': float(humidity),  # Convert to native Python float
            'soilQuality': float(soil_quality),  # Convert to native Python float
            'vegetationDensity': float(vegetation_density)  # Convert to native Python float
        })
    except Exception as e:
        app.logger.error(f"Error processing the request: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
