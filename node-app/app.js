const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (if any)
app.use(express.static('public'));

// Main route with combined HTML/CSS
app.get('/', async (req, res) => {
    try {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js Quote App</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 40px;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1 { 
                        color: #2c3e50; 
                        text-align: center;
                    }
                    .quote-container {
                        background: #f9f9f9;
                        border-left: 5px solid #2c3e50;
                        padding: 20px;
                        margin: 30px 0;
                    }
                    .quote {
                        font-size: 1.2em;
                        font-style: italic;
                    }
                    .author {
                        text-align: right;
                        font-weight: bold;
                        margin-top: 10px;
                    }
                    .btn {
                        display: inline-block;
                        background: #2c3e50;
                        color: white;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 10px 0;
                    }
                    .btn:hover {
                        background: #1a252f;
                    }
                    .error {
                        color: #e74c3c;
                    }
                </style>
            </head>
            <body>
                <h1>Welcome to My Node.js App!</h1>
                
                <p>Click below to get a random programming quote:</p>
                <a href="/" class="btn" id="getQuote">Get Quote</a>
                
                <div id="quoteDisplay"></div>
                
                <script>
                    document.getElementById('getQuote').addEventListener('click', async function(e) {
                        e.preventDefault();
                        try {
                            const response = await fetch('/quote');
                            const data = await response.text();
                            document.getElementById('quoteDisplay').innerHTML = data;
                        } catch (error) {
                            document.getElementById('quoteDisplay').innerHTML = 
                                '<p class="error">Failed to fetch quote. Try again later.</p>';
                        }
                    });
                </script>
            </body>
            </html>
        `;
        res.send(html);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Quote API endpoint
app.get('/quote', async (req, res) => {
    try {
        const response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes/random');
        const quote = response.data.en;
        const author = response.data.author;
        res.send(`
            <div class="quote-container">
                <p class="quote">"${quote}"</p>
                <p class="author">- ${author}</p>
            </div>
            <a href="/" class="btn">Back to Home</a>
        `);
    } catch (error) {
        res.send('<p class="error">Failed to fetch quote. Try again later.</p>');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
