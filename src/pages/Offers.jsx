import React from 'react';
import { Tag, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import './Offers.css';

const Offers = () => {
    const offers = [
        {
            id: 1,
            title: "Year-End Exchange Bonus",
            description: "Get up to ₹50,000 extra value on your old car exchange. Valid for all SUV bookings this month.",
            tag: "Limited Time",
            expiry: "Dec 31, 2025",
            color: "yellow"
        },
        {
            id: 2,
            title: "Low Interest Finance",
            description: "Own your dream car with interest rates starting at just 7.99%*. Fast approval and minimal documentation.",
            tag: "Best Deal",
            expiry: "Ongoing",
            color: "silver"
        },
        {
            id: 3,
            title: "Complimentary Ceramic Coating",
            description: "Free 9H Ceramic Coating worth ₹15,000 with every premium sedan purchase.",
            tag: "Freebie",
            expiry: "Jan 15, 2026",
            color: "gold"
        }
    ];

    return (
        <div className="offers-page container">
            <header className="page-header">
                <h1>Exclusive <span className="text-gold">Offers</span></h1>
                <p>Grab the best deals on pre-owned luxury and budget cars in Ratnagiri.</p>
            </header>

            <div className="offers-grid">
                {offers.map(offer => (
                    <div key={offer.id} className={`offer-card ${offer.color}`}>
                        <div className="offer-tag">{offer.tag}</div>
                        <div className="offer-content">
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>

                            <div className="offer-footer">
                                <div className="expiry">
                                    <Calendar size={14} />
                                    <span>Valid until: {offer.expiry}</span>
                                </div>
                                <a href={`https://wa.me/919876543210?text=I'm interested in the ${offer.title} offer`} className="btn-offer">
                                    Claim Now <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <section className="finance-cta glass fade-in">
                <div className="cta-text">
                    <h2>Need Finance?</h2>
                    <p>We partner with top banks to provide you with the best ROI and hassle-free processing.</p>
                </div>
                <a href="/contact" className="btn btn-primary">Check Eligibility <ArrowRight size={18} /></a>
            </section>
        </div>
    );
};

export default Offers;
