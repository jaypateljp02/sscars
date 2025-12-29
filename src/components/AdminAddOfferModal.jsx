import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Save } from 'lucide-react';
import '../styles/global.css';

const AdminAddOfferModal = ({ onClose, onOfferAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: 'Limited Time',
        expiry: '',
        color: 'yellow' // yellow, silver, gold
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
                .from('offers')
                .insert([formData]);

            if (error) throw error;

            if (onOfferAdded) onOfferAdded();
            onClose();
        } catch (err) {
            console.error('Error adding offer:', err);
            setError(err.message || 'Failed to add offer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <div className="modal-header">
                    <h2>Add New Offer</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Winter Sale" />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Tag</label>
                            <select name="tag" value={formData.tag} onChange={handleChange}>
                                <option value="Limited Time">Limited Time</option>
                                <option value="Best Deal">Best Deal</option>
                                <option value="New Arrival">New Arrival</option>
                                <option value="Hot">Hot</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="date" name="expiry" value={formData.expiry} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Card Color Theme</label>
                        <select name="color" value={formData.color} onChange={handleChange}>
                            <option value="yellow">Yellow (Standard)</option>
                            <option value="silver">Silver (Premium)</option>
                            <option value="gold">Gold (Luxury)</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Create Offer'} <Save size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddOfferModal;
