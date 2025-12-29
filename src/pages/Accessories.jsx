import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import './Accessories.css';

const Accessories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAccessories();
    }, []);

    const fetchAccessories = async () => {
        try {
            const { data, error } = await supabase
                .from('accessories')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                // Group by category
                const grouped = data.reduce((acc, item) => {
                    const cat = item.category || 'General';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(item);
                    return acc;
                }, {});

                const catArray = Object.keys(grouped).map(key => ({
                    name: key,
                    items: grouped[key]
                }));

                setCategories(catArray);
            }
        } catch (error) {
            console.error('Error fetching accessories:', error);
            // Optional: fallback to static data if needed, but for now just log
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="accessories-page container">
            <header className="page-header">
                <h1>Premium <span className="text-gold">Accessories</span></h1>
                <p>Enhance your driving experience with our curated automotive collection.</p>
            </header>

            {loading ? (
                <div className="loading-state text-center py-5">
                    <p>Loading collection...</p>
                </div>
            ) : categories.length === 0 ? (
                <div className="empty-state text-center py-5 glass">
                    <h3>Coming Soon</h3>
                    <p>We are updating our catalog. Please check back later.</p>
                </div>
            ) : (
                categories.map(cat => (
                    <section key={cat.name} className="accessory-section">
                        <h2 className="section-title">{cat.name}</h2>
                        <div className="accessory-grid">
                            {cat.items.map(item => (
                                <div key={item.id || item.name} className="accessory-card glass">
                                    <div className="accessory-img">
                                        <img src={item.image} alt={item.name} onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Accessory'} />
                                    </div>
                                    <div className="accessory-info">
                                        <h3>{item.name}</h3>
                                        <p className="price text-gold">{item.price}</p>
                                        <a href={`https://wa.me/919876543210?text=I'm interested in ${item.name}`} className="btn-inquiry">
                                            <MessageCircle size={16} /> Inquiry
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            )}

            <div className="custom-request glass">
                <ShoppingBag size={40} className="text-gold" />
                <div>
                    <h3>Looking for something specific?</h3>
                    <p>We source all types of premium accessories. Tell us what you need!</p>
                </div>
                <a href="https://wa.me/919876543210" className="btn btn-primary">Custom Order</a>
            </div>
        </div>
    );
};

export default Accessories;
