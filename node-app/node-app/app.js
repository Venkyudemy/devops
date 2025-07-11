const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All-in-One Template</title>
    <style>
        /* CSS Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        /* Layout */
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        /* Header */
        header {
            background-color: #2c3e50;
            color: white;
            padding: 20px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        
        nav ul {
            display: flex;
            list-style: none;
        }
        
        nav ul li {
            margin-left: 20px;
        }
        
        nav ul li a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        nav ul li a:hover {
            color: #3498db;
        }
        
        /* Hero Section */
        .hero {
            text-align: center;
            padding: 80px 0;
            background: linear-gradient(135deg, #3498db, #2c3e50);
            color: white;
        }
        
        .hero h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        
        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
        }
        
        /* Buttons */
        .btn {
            display: inline-block;
            background-color: #e74c3c;
            color: white;
            padding: 10px 25px;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: #c0392b;
        }
        
        /* Features Section */
        .features {
            padding: 60px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 30px;
        }
        
        .feature-card {
            flex: 1 1 300px;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        /* Footer */
        footer {
            background-color: #2c3e50;
            color: white;
            text-align: center;
            padding: 20px 0;
            margin-top: 40px;
        }
        
        /* Quote Section */
        .quote-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            margin: 40px auto;
            max-width: 800px;
            text-align: center;
        }
        
        .quote {
            font-size: 1.5rem;
            font-style: italic;
            margin-bottom: 15px;
        }
        
        .author {
            font-size: 1.2rem;
            color: #7f8c8d;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                text-align: center;
            }
            
            nav ul {
                margin-top: 20px;
                justify-content: center;
            }
            
            .features {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="logo">MySite</div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/quote">Get Quote</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h2>Welcome to Our Website</h2>
            <p>A clean, responsive template that works on all devices</p>
            <a href="/quote" class="btn">Get Random Quote</a>
        </div>
    </section>

    <!-- Main Content -->
    <main class="container">
        <section class="features">
            <div class="feature-card">
                <h3>Feature One</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </div>
            <div class="feature-card">
                <h3>Feature Two</h3>
                <p>Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa.</p>
            </div>
            <div class="feature-card">
                <h3>Feature Three</h3>
                <p>Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales.</p>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; 2023 MySite. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Client-side JavaScript for handling quote display
        document.addEventListener('DOMContentLoaded', function() {
            // Check if we're on the quote page
            if(window.location.pathname === '/quote') {
                fetchQuote();
            }
            
            // Handle quote button click
            document.querySelector('.btn')?.addEventListener('click', function(e) {
                if(this.getAttribute('href') === '/quote') {
                    e.preventDefault();
                    fetchQuote();
                }
            });
            
            async function fetchQuote() {
                try {
                    const response = await fetch('/api/quote');
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    const data = await response.json();
                    
                    // Create quote display
                    const quoteHTML = \`
                        <div class="quote-container">
                            <p class="quote">"\${data.quote}"</p>
                            <p class="author">- \${data.author}</p>
                            <a href="/" class="btn">Back to Home</a>
                        </div>
                    \`;
                    
                    // Replace main content with quote
                    document.querySelector('main').innerHTML = quoteHTML;
                } catch (error) {
                    console.error('Error fetching quote:', error);
                    document.querySelector('main').innerHTML = \`
                        <div class="quote-container">
                            <p>Failed to load quote. Please try again later.</p>
                            <a href="/" class="btn">Back to Home</a>
                        </div>
                    \`;
                }
            }
        });
    </script>
</body>
</html>
    `;
    res.send(html);
});

// API endpoint for quotes
app.get('/api/quote', async (req, res) => {
    try {
        const response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes/random');
        res.json({
            quote: response.data.en,
            author: response.data.author
        });
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

// Route for direct quote page
app.get('/quote', (req, res) => {
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
