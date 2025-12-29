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
                .limit(6);

            if (error) throw error;

            if (data && data.length > 0) {
                setReviews(data);
            } else {
                setReviews(defaultReviews);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews(defaultReviews);
        } finally {
            setLoading(false);
        }
    };

    const defaultReviews = [
        {
            id: 'demo-1',
            name: "Prasad Sawant",
            car: "Maruti Suzuki Swift",
            comment: "Excellent service from SS Cars. The car was in pristine condition, and the transfer process was very smooth. Best place in Ratnagiri for pre-owned cars.",
            rating: 5,
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
            id: 'demo-2',
            name: "Sneha Patil",
            car: "Hyundai Creta",
            comment: "Highly recommended! They have a great collection of certified cars. Transparent pricing and no hidden issues. Very happy with my purchase.",
            rating: 5,
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
            id: 'demo-3',
            name: "Rahul Mane",
            car: "Honda City",
            comment: "The accessories department is also great. Got my Android system installed here. Professional work and premium quality products.",
            rating: 4,
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        }
    ];

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
