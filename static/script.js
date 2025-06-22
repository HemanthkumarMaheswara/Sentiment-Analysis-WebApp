document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('review-form');
    const resultCard = document.getElementById('result-card');
    const cardAnimate = document.getElementById('card-animate');
    const sentimentEmoji = document.getElementById('sentiment-emoji');
    const sentimentLabel = document.getElementById('sentiment-label');
    const confidenceBar = document.getElementById('confidence-bar');
    const confidenceValue = document.getElementById('confidence-value');
    const processedText = document.getElementById('processed-text');
    const reviewInput = document.getElementById('review');
    const resetBtn = document.getElementById('reset-btn');

    function getSentimentInfo(sentiment) {
        if (sentiment.toLowerCase() === 'negative') {
            return { emoji: '😞', label: 'Negative', color: '#e53935' };
        } else if (sentiment.toLowerCase() === 'positive') {
            return { emoji: '😊', label: 'Positive', color: '#43a047' };
        } else {
            return { emoji: '❓', label: 'Unknown', color: '#888' };
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        resultCard.style.display = 'block';
        cardAnimate.classList.remove('show');
        const review = reviewInput.value;
        sentimentLabel.textContent = '...';
        sentimentEmoji.textContent = '⏳';
        confidenceBar.style.width = '0%';
        confidenceValue.textContent = '';
        processedText.textContent = '';
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review })
        })
        .then(response => response.json())
        .then(data => {
            const info = getSentimentInfo(data.sentiment);
            sentimentEmoji.textContent = info.emoji;
            sentimentLabel.textContent = info.label;
            sentimentLabel.style.color = info.color;
            let conf = data.confidence ? (data.confidence * 100).toFixed(2) : '100.00';
            confidenceValue.textContent = conf + '%';
            confidenceBar.style.width = conf + '%';
            confidenceBar.style.background = info.color === '#e53935' ? 'linear-gradient(90deg, #e53935 0%, #ffb300 100%)' : 'linear-gradient(90deg, #43a047 0%, #5b6ee1 100%)';
            processedText.textContent = data.processed_text || review;
            resetBtn.style.display = 'inline-block';
            // Animate card content
            requestAnimationFrame(() => cardAnimate.classList.add('show'));
            // Emoji bounce animation
            sentimentEmoji.classList.remove('animated');
            void sentimentEmoji.offsetWidth;
            sentimentEmoji.classList.add('animated');
        })
        .catch(() => {
            sentimentEmoji.textContent = '❌';
            sentimentLabel.textContent = 'Error';
            confidenceBar.style.width = '0%';
            confidenceValue.textContent = '';
            processedText.textContent = '';
            resetBtn.style.display = 'inline-block';
            requestAnimationFrame(() => cardAnimate.classList.add('show'));
        });
    });

    resetBtn.addEventListener('click', function() {
        reviewInput.value = '';
        resultCard.style.display = 'none';
        cardAnimate.classList.remove('show');
        sentimentEmoji.textContent = '😐';
        sentimentLabel.textContent = 'Neutral';
        sentimentLabel.style.color = '#888';
        confidenceBar.style.width = '0%';
        confidenceValue.textContent = '';
        processedText.textContent = '';
        reviewInput.focus();
        resetBtn.style.display = 'none';
    });
}); 