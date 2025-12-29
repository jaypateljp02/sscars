import React from 'react';
import { ShieldCheck, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import '../styles/Testimonials.css';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <div className="badge-certified fade-in">
                        <ShieldCheck size={20} className="text-gold" />
                        <span>Premium Quality Assured</span>
                    </div>

                    <h1 className="fade-in">
                        SS CARS <span className="text-gold">RATNAGIRI</span>
                    </h1>
                    <p className="tagline fade-in">
                        Best Quality Used Cars | Luxury Accessories
                    </p>

                    <div className="hero-ctas fade-in">
                        <a href="/cars" className="btn btn-primary">
                            Explore Showroom <ArrowRight size={18} />
                        </a>
                        <a href="/contact" className="btn btn-outline glass">
                            Visit Us
                        </a>
                    </div>
                </div>

                {/* Recently Sold Ticker */}
                <div className="sold-ticker-wrapper glass">
                    <div className="sold-ticker">
                        <span className="ticker-label">RECENTLY SOLD:</span>
                        <div className="ticker-items">
                            <span>Maruti Suzuki Swift VXI sold last week! •</span>
                            <span>Hyundai Creta SX (O) delivered to client! •</span>
                            <span>Toyota Fortuner 4x4 found a new home •</span>
                            <span>Honda City ZX (MT) recently purchased •</span>
                            <span>Mahindra Thar LX Diesel sold! •</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* Floating Action Bar */}
            <div className="floating-bar glass">
                <a href="tel:+919876543210" className="floating-item call">
                    <Phone size={20} />
                    <span>Call Now</span>
                </a>
                <div className="divider"></div>
                <a href="https://wa.me/919876543210?text=I'm interested in available cars" className="floating-item whatsapp">
                    <MessageCircle size={20} />
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>
    );
};

export default Home;
