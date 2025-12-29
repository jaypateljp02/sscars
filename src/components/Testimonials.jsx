import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Star, Quote } from 'lucide-react';
import '../styles/Testimonials.css';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(6); // Show top 6

            if (error) throw error;
            if (data) setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="testimonials container">
            <div className="section-header center">
                <h2>Customer <span className="text-gold">Testimonials</span></h2>
                <p>100+ Happy Customers and counting...</p>
            </div>

            {loading ? (
                <div className="text-center">Loading reviews...</div>
            ) : reviews.length === 0 ? (
                <div className="text-center glass p-5">
                    <p>No reviews yet. Be the first to share your experience!</p>
                </div>
            ) : (
                <div className="testimonials-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="testimonial-card glass">
                            <Quote className="quote-icon text-gold" size={40} />
                            <p className="comment">{review.comment}</p>

                            <div className="stars">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                                ))}
                            </div>

                            <div className="client-info">
                                <img
                                    src={review.photo || 'https://ui-avatars.com/api/?name=' + review.name}
                                    alt={review.name}
                                    className="client-photo"
                                />
                                <div>
                                    <h4>{review.name}</h4>
                                    <p>Purchased: {review.car}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Testimonials;
