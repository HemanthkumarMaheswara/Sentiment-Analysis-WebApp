from flask import Flask, render_template, request, jsonify
import pickle
import os

app = Flask(__name__)

# Load the trained model and vectorizer
with open('Trained.pkl', 'rb') as f:
    model = pickle.load(f)
with open('Vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    review = data.get('review', '')
    if not review:
        return jsonify({'sentiment': 'No review provided.'})
    X = vectorizer.transform([review])
    prediction = model.predict(X)[0]
    print("Model prediction:", prediction)  # For debugging
    # Map prediction to 'positive'/'negative'
    label_map = {1: 'positive', 0: 'negative', 'pos': 'positive', 'neg': 'negative', 'positive': 'positive', 'negative': 'negative'}
    sentiment = label_map.get(prediction, str(prediction))
    if hasattr(model, 'predict_proba'):
        proba = model.predict_proba(X)[0]
        confidence = float(max(proba))
    else:
        confidence = 1.0
    processed_text = review
    return jsonify({
        'sentiment': sentiment,
        'confidence': confidence,
        'processed_text': processed_text
    })

if __name__ == '__main__':
    app.run(debug=True) 