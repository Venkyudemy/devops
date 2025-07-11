const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const html = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stellar Horizon | Premium Dark UI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #6c5ce7;
            --secondary: #a29bfe;
            --accent: #fd79a8;
            --dark: #0f0e17;
            --light: #fffffe;
            --text: #a7a9be;
            --highlight: #ff8906;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--dark);
            color: var(--text);
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(108, 92, 231, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 30%, rgba(253, 121, 168, 0.1) 0%, transparent 25%),
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="white" opacity="0.7"/><circle cx="50" cy="30" r="1" fill="white" opacity="0.5"/><circle cx="70" cy="10" r="1" fill="white" opacity="0.8"/><circle cx="10" cy="70" r="1" fill="white" opacity="0.6"/><circle cx="40" cy="80" r="1" fill="white" opacity="0.4"/><circle cx="90" cy="60" r="1" fill="white" opacity="0.9"/><circle cx="80" cy="90" r="1" fill="white" opacity="0.3"/></svg>');
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Header */
        header {
            padding: 2rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 10;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--light);
            display: flex;
            align-items: center;
        }

        .logo span {
            color: var(--primary);
            margin-left: 0.5rem;
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        nav a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }

        nav a:hover {
            color: var(--light);
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary);
            transition: width 0.3s ease;
        }

        nav a:hover::after {
            width: 100%;
        }

        .cta-button {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--light);
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
        }

        /* Hero Section */
        .hero {
            padding: 5rem 0;
            display: flex;
            align-items: center;
            min-height: 80vh;
            position: relative;
        }

        .hero-content {
            flex: 1;
            position: relative;
            z-index: 5;
        }

        .hero h1 {
            font-size: 4rem;
            color: var(--light);
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }

        .hero h1 span {
            color: var(--primary);
            position: relative;
        }

        .hero h1 span::after {
            content: '';
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 100%;
            height: 10px;
            background: rgba(162, 155, 254, 0.3);
            z-index: -1;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 600px;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }

        .secondary-button {
            background: transparent;
            color: var(--light);
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .secondary-button:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .hero-image {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: center;
        }

        .hero-image img {
            max-width: 100%;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            transform: perspective(1000px) rotateY(-15deg);
            transition: all 0.5s ease;
        }

        .hero-image:hover img {
            transform: perspective(1000px) rotateY(-5deg);
        }

        .hero-image::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
            filter: blur(70px);
            opacity: 0.3;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
        }

        /* Features Section */
        .features {
            padding: 6rem 0;
        }

        .section-title {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-title h2 {
            font-size: 2.5rem;
            color: var(--light);
            margin-bottom: 1rem;
        }

        .section-title p {
            max-width: 600px;
            margin: 0 auto;
            font-size: 1.1rem;
            opacity: 0.8;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            color: var(--light);
            font-size: 1.5rem;
        }

        .feature-card h3 {
            color: var(--light);
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }

        /* Testimonials */
        .testimonials {
            padding: 6rem 0;
            background: rgba(15, 14, 23, 0.7);
            position: relative;
        }

        .testimonials::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M30,10 Q50,5 70,30 T90,70 Q85,50 60,30 T10,20" fill="none" stroke="rgba(108,92,231,0.05)" stroke-width="2"/></svg>');
            opacity: 0.3;
            z-index: -1;
        }

        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .testimonial-card {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 5rem;
            color: rgba(255, 255, 255, 0.05);
            font-family: serif;
            line-height: 1;
        }

        .testimonial-content {
            margin-bottom: 1.5rem;
            font-style: italic;
            position: relative;
            z-index: 2;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 1rem;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--light);
            font-weight: bold;
        }

        .author-info h4 {
            color: var(--light);
            margin-bottom: 0.2rem;
        }

        .author-info p {
            font-size: 0.9rem;
            opacity: 0.7;
        }

        /* CTA Section */
        .cta-section {
            padding: 6rem 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .cta-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(108, 92, 231, 0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
            z-index: -1;
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .cta-content {
            max-width: 700px;
            margin: 0 auto;
            position: relative;
        }

        .cta-content h2 {
            font-size: 2.5rem;
            color: var(--light);
            margin-bottom: 1.5rem;
        }

        .cta-content p {
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }

        /* Footer */
        footer {
            padding: 4rem 0 2rem;
            background: rgba(0, 0, 0, 0.2);
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .footer-col h3 {
            color: var(--light);
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
        }

        .footer-col ul {
            list-style: none;
        }

        .footer-col li {
            margin-bottom: 0.8rem;
        }

        .footer-col a {
            color: var(--text);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .footer-col a:hover {
            color: var(--light);
            padding-left: 5px;
        }

        .social-links {
            display: flex;
            gap: 1rem;
        }

        .social-links a {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text);
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background: var(--primary);
            color: var(--light);
            transform: translateY(-3px);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Animations */
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        .floating {
            animation: float 6s ease-in-out infinite;
        }

        .delay-1 {
            animation-delay: 1s;
        }

        .delay-2 {
            animation-delay: 2s;
        }

        /* Responsive */
        @media (max-width: 992px) {
            .hero {
                flex-direction: column;
                text-align: center;
            }

            .hero-content {
                margin-bottom: 3rem;
            }

            .hero p {
                margin: 0 auto 2rem;
            }

            .hero-buttons {
                justify-content: center;
            }

            .hero-image {
                margin-top: 2rem;
            }
        }

        @media (max-width: 768px) {
            nav ul {
                display: none;
            position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: var(--dark);
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 100;
            }

            nav ul.show {
                display: flex;
            }

            .menu-toggle {
                display: block;
                z-index: 101;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .section-title h2 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                Stellar<span>Horizon</span>
            </div>
            <nav>
                <ul id="nav-menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <button class="menu-toggle" id="menu-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </nav>
            <a href="#" class="cta-button">Get Started</a>
        </header>
    </div>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Elevate Your <span>Digital Experience</span> To The Stars</h1>
                <p>Discover the perfect blend of cutting-edge technology and elegant design that will transform your online presence and captivate your audience.</p>
                <div class="hero-buttons">
                    <a href="#" class="cta-button">Explore Now</a>
                    <a href="#" class="secondary-button">Learn More</a>
                </div>
            </div>
            <div class="hero-image floating">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXLzsHFCTlp2hDNO1NDbagIpuRizlM4JtWEQR5BocBSDtpI6b_aQGj8kvjpwIuSwJom6Q&usqp=CAU" alt="Hero Image">
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <div class="section-title">
                <h2>Why Choose Us</h2>
                <p>We combine innovation with elegance to deliver exceptional digital experiences that stand out from the crowd.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card delay-1 floating">
                    <div class="feature-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3>Lightning Fast</h3>
                    <p>Optimized for performance with lightning-fast load times and smooth animations that delight users.</p>
                </div>
                <div class="feature-card floating">
                    <div class="feature-icon">
                        <i class="fas fa-paint-brush"></i>
                    </div>
                    <h3>Stunning Design</h3>
                    <p>Beautiful, modern interfaces crafted with attention to detail and pixel-perfect precision.</p>
                </div>
                <div class="feature-card delay-2 floating">
                    <div class="feature-icon">
                        <i class="fas fa-cog"></i>
                    </div>
                    <h3>Fully Customizable</h3>
                    <p>Tailor every aspect to match your brand identity with our easy-to-use customization options.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="container">
            <div class="section-title">
                <h2>What Our Clients Say</h2>
                <p>Don't just take our word for it. Here's what our satisfied customers have to say about their experience.</p>
            </div>
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <p>This platform transformed our online presence. The design is stunning and the performance is unmatched in the industry.</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">JD</div>
                        <div class="author-info">
                            <h4>Jane Doe</h4>
                            <p>CEO, TechSolutions</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <p>Working with StellarHorizon was a game-changer for our business. Their attention to detail is remarkable.</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">MS</div>
                        <div class="author-info">
                            <h4>Michael Smith</h4>
                            <p>Marketing Director</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <p>The best investment we've made in our digital strategy. The results exceeded all our expectations.</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">AJ</div>
                        <div class="author-info">
                            <h4>Anna Johnson</h4>
                            <p>Founder, CreativeMinds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Transform Your Digital Presence?</h2>
                <p>Join thousands of satisfied customers who have elevated their brand with our premium solutions.</p>
                <a href="#" class="cta-button">Get Started Today</a>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>StellarHorizon</h3>
                    <p>Elevating digital experiences to new heights with innovative design and cutting-edge technology.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#">UI/UX Design</a></li>
                        <li><a href="#">Web Development</a></li>
                        <li><a href="#">Digital Marketing</a></li>
                        <li><a href="#">Branding</a></li>
                        <li><a href="#">Consulting</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Contact</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> 123 Stellar Ave, Cosmos City</li>
                        <li><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
                        <li><i class="fas fa-envelope"></i> hello@stellarhorizon.com</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 StellarHorizon. All rights reserved. | Designed with <i class="fas fa-heart" style="color: var(--accent);"></i> in the cosmos</p>
            </div>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            menuToggle.innerHTML = navMenu.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Animation on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            document.querySelector('.hero-image').style.transform = `perspective(1000px) rotateY(-15deg) translateY(${scrollPosition * 0.1}px)`;
        });
    </script>
</body>
</html>
    `;
    res.send(html);
});

app.get('/quote', async (req, res) => {
    try {
        const response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes/random');
        const quote = response.data.en;
        const author = response.data.author;
        res.send(`<h2>"${quote}"</h2><p>- ${author}</p><a href="/">Back</a>`);
    } catch (error) {
        res.send('<p>Failed to fetch quote. Try again later.</p><a href="/">Back</a>');
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
