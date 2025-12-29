import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Save } from 'lucide-react';

const AdminAddReviewModal = ({ onClose, onAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        car: '',
        comment: '',
        rating: 5,
        photo: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase
                .from('reviews')
                .insert([{
                    ...formData,
                    rating: Number(formData.rating)
                }]);

            if (error) throw error;

            if (onAdded) onAdded();
            onClose();
        } catch (err) {
            console.error('Error adding review:', err);
            setError(err.message || 'Failed to add review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <div className="modal-header">
                    <h2>Add Customer Review</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Customer Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Car Purchased</label>
                            <input type="text" name="car" value={formData.car} onChange={handleChange} required placeholder="e.g. Swift VXI" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Rating (1-5)</label>
                            <select name="rating" value={formData.rating} onChange={handleChange}>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Customer Photo URL</label>
                            <input type="text" name="photo" value={formData.photo} onChange={handleChange} placeholder="https://..." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Review Comment</label>
                        <textarea name="comment" value={formData.comment} onChange={handleChange} required rows="3" placeholder="Great service..."></textarea>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Add Review'} <Save size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddReviewModal;
