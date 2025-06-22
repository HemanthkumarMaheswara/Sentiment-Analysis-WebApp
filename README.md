# Sentiment Analysis Web App

A modern, responsive web app for sentiment analysis using a trained machine learning model. Users can enter a review and instantly see the predicted sentiment (positive/negative) with confidence.

## Features
- Real-time sentiment prediction
- Responsive, animated UI
- Confidence score and processed text display
- Easy to deploy on Render

## Project Details
This project is a full-stack web application that allows users to analyze the sentiment of any text review (such as product, movie, or service reviews). It uses a machine learning model trained on labeled review data to classify input as either positive or negative sentiment. The app provides a confidence score for each prediction and displays the processed input text.

**Technology Stack:**
- **Frontend:** HTML, CSS, JavaScript (with modern animations and responsive design)
- **Backend:** Python Flask web framework
- **Machine Learning:** scikit-learn (TfidfVectorizer + Logistic Regression or Naive Bayes)
- **Model Files:** Pre-trained model (`Trained.pkl`) and vectorizer (`Vectorizer.pkl`)
- **Deployment:** Render (cloud platform for web apps)

**How it works:**
1. The user enters a review in the web form.
2. The frontend sends the review to the Flask backend via AJAX.
3. The backend loads the trained model and vectorizer, processes the text, and predicts the sentiment and confidence.
4. The result is sent back and displayed instantly with animations and a confidence bar.

## Demo
![Demo Screenshot](demo.png)

## Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
3. **Run locally:**
   ```sh
   python app.py
   ```
   Visit [http://127.0.0.1:5000/](http://127.0.0.1:5000/) in your browser.

## Deployment (Render)
1. **Push your code to GitHub.**
2. **Create a `Procfile` with:**
   ```
   web: gunicorn app:app
   ```
3. **Go to [Render](https://dashboard.render.com/), create a new Web Service, and connect your repo.**
4. **Set the Start Command:**
   ```
   gunicorn app:app
   ```
5. **Deploy!**

## Files
- `app.py` — Flask backend
- `static/` — CSS and JS
- `templates/` — HTML templates
- `Trained.pkl`, `Vectorizer.pkl` — Model files
- `requirements.txt` — Python dependencies
- `Procfile` — For deployment

## License
MIT 