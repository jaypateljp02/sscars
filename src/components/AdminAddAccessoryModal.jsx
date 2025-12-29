import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Save } from 'lucide-react';

const AdminAddAccessoryModal = ({ onClose, onAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Interior Upgrades',
        image: ''
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
                .from('accessories')
                .insert([formData]);

            if (error) throw error;

            if (onAdded) onAdded();
            onClose();
        } catch (err) {
            console.error('Error adding accessory:', err);
            setError(err.message || 'Failed to add accessory');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <div className="modal-header">
                    <h2>Add New Accessory</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Item Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Bass Tube" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price Display</label>
                            <input type="text" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. Starts ₹4,500" />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Interior Upgrades">Interior Upgrades</option>
                                <option value="Exterior & Lighting">Exterior & Lighting</option>
                                <option value="Car Care">Car Care</option>
                                <option value="Gadgets">Gadgets</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <textarea name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." rows="2"></textarea>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Add Item'} <Save size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddAccessoryModal;
