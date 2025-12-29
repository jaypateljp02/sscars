import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page container">
            <header className="page-header">
                <h1>Contact <span className="text-gold">Us</span></h1>
                <p>Visit our showroom or reach out for inquiries.</p>
            </header>

            <div className="contact-grid">
                <div className="contact-info-cards">
                    <div className="contact-card glass">
                        <MapPin className="text-gold" size={24} />
                        <div>
                            <h3>Showroom Address</h3>
                            <p>SS CARS, Near Ratnagiri Railway Station, Malnaka, Ratnagiri, Maharashtra 415612</p>
                            <a href="https://maps.google.com" target="_blank" className="map-link">
                                <Navigation size={14} /> Get Directions
                            </a>
                        </div>
                    </div>

                    <div className="contact-card glass">
                        <Phone className="text-gold" size={24} />
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                            <p>+91 91234 56789</p>
                        </div>
                    </div>

                    <div className="contact-card glass">
                        <Clock className="text-gold" size={24} />
                        <div>
                            <h3>Business Hours</h3>
                            <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                            <p>Sunday: 11:00 AM - 5:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="map-container glass">
                    {/* Placeholder for Google Map Embed */}
                    <div className="map-placeholder">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15250.718870198!2d73.298642!3d17.000557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be973273187232b%3A0xe7cd7526ea036120!2sRatnagiri%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703840000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="whatsapp-cta glass fade-in">
                <h2>Start a Conversation</h2>
                <p>Have a question about a specific car or service? Hub us on WhatsApp for instant response.</p>
                <a href="https://wa.me/919876543210" className="btn btn-whatsapp-lg">
                    <MessageCircle size={24} /> Chat with SS Cars
                </a>
            </div>
        </div>
    );
};

export default Contact;
