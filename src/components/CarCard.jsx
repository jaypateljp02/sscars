import React from 'react';
import { Fuel, Gauge, User, MessageCircle } from 'lucide-react';

const CarCard = ({ car }) => {
    const whatsappLink = `https://wa.me/919876543210?text=I'm interested in the ${car.year} ${car.make} ${car.model} listed for ₹${car.price.toLocaleString('en-IN')}`;

    return (
        <div className="car-card glass fade-in">
            <div className="car-image">
                <img src={car.images[0] || 'https://via.placeholder.com/400x250?text=No+Image'} alt={`${car.make} ${car.model}`} />
                {car.status === 'sold' && <div className="sold-overlay">SOLD</div>}
            </div>

            <div className="car-info">
                <h3>{car.year} {car.make} {car.model}</h3>
                <p className="car-price">₹ {car.price.toLocaleString('en-IN')}</p>

                <div className="car-stats">
                    <div className="stat">
                        <Fuel size={14} className="text-gold" />
                        <span>{car.fuel_type}</span>
                    </div>
                    <div className="stat">
                        <Gauge size={14} className="text-gold" />
                        <span>{car.mileage.toLocaleString('en-IN')} KM</span>
                    </div>
                    <div className="stat">
                        <User size={14} className="text-gold" />
                        <span>{car.owners} {car.owners === 1 ? 'Owner' : 'Owners'}</span>
                    </div>
                </div>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <MessageCircle size={18} /> Inquiry on WhatsApp
                </a>
            </div>
        </div>
    );
};

export default CarCard;
