from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("best_model.pkl", "rb"))
label_encoder = pickle.load(open("label_encoder.pkl", "rb"))


@app.route("/")
def home():
    return "Backend Running"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON data received"}), 400

    required_fields = ["Nitrogen", "Phosphorous", "Potassium", "Temperature", "Humidity", "pH", "Rainfall"]
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    try:
        nitrogen    = float(data["Nitrogen"])
        phosphorous = float(data["Phosphorous"])
        potassium   = float(data["Potassium"])
        temperature = float(data["Temperature"])
        humidity    = float(data["Humidity"])
        ph          = float(data["pH"])
        rainfall    = float(data["Rainfall"])

        if not (20 <= nitrogen <= 200):
            return jsonify({"error": "Nitrogen must be between 20 and 200 kg/ha"}), 422
        if not (20 <= phosphorous <= 100):
            return jsonify({"error": "Phosphorous must be between 20 and 100 kg/ha"}), 422
        if not (20 <= potassium <= 150):
            return jsonify({"error": "Potassium must be between 20 and 150 kg/ha"}), 422
        if not (5 <= temperature <= 47):
            return jsonify({"error": "Temperature must be between 5 and 47 C"}), 422
        if not (15 <= humidity <= 100):
            return jsonify({"error": "Humidity must be between 15 and 100 %"}), 422
        if not (5 <= ph <= 9):
            return jsonify({"error": "pH must be between 5 and 9"}), 422
        if not (330 <= rainfall <= 2500):
            return jsonify({"error": "Rainfall must be between 330 and 2500 mm"}), 422

        features = [[nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall]]

        prediction = model.predict(features)
        crop = label_encoder.inverse_transform(prediction)

        return jsonify({"crop": crop[0]})

    except (ValueError, KeyError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 422
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)