import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="logo">
                        <span className="logo-ss">SS</span>
                        <span className="logo-cars">CARS</span>
                        <span className="logo-loc">RATNAGIRI</span>
                    </div>
                    <p className="footer-desc">
                        Ratnagiri's premier destination for high-quality certified pre-owned cars and premium automotive accessories. Excellence delivered since 2015.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon"><Instagram size={20} /></a>
                        <a href="#" className="social-icon"><Facebook size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/cars">Available Cars</a></li>
                        <li><a href="/offers">Current Offers</a></li>
                        <li><a href="/accessories">Accessories</a></li>
                        <li><a href="/contact">Location</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <div className="contact-item">
                        <MapPin size={18} className="text-gold" />
                        <span>Ratnagiri, Maharashtra, India</span>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} className="text-gold" />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} className="text-gold" />
                        <span>info@sscarsratnagiri.com</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} SS Cars Ratnagiri. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
