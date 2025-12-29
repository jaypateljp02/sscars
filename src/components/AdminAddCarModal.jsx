import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Save, Upload } from 'lucide-react';
import '../styles/global.css'; // Ensure global styles are available

const AdminAddCarModal = ({ onClose, onCarAdded }) => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        fuel_type: 'Petrol',
        mileage: '',
        owners: 1,
        images: '', // Comma separated URLs for now
        status: 'available'
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
            // Process images from string to array
            const imageArray = formData.images.split(',').map(url => url.trim()).filter(url => url);

            const { data, error } = await supabase
                .from('cars')
                .insert([{
                    ...formData,
                    images: imageArray,
                    price: Number(formData.price),
                    year: Number(formData.year),
                    mileage: Number(formData.mileage),
                    owners: Number(formData.owners)
                }])
                .select();

            if (error) throw error;

            if (onCarAdded) onCarAdded();
            onClose();
        } catch (err) {
            console.error('Error adding car:', err);
            setError(err.message || 'Failed to add car');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <div className="modal-header">
                    <h2>Add New Car</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Make</label>
                            <input type="text" name="make" value={formData.make} onChange={handleChange} required placeholder="e.g. Hyundai" />
                        </div>
                        <div className="form-group">
                            <label>Model</label>
                            <input type="text" name="model" value={formData.model} onChange={handleChange} required placeholder="e.g. Creta" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Year</label>
                            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. 500000" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Fuel Type</label>
                            <select name="fuel_type" value={formData.fuel_type} onChange={handleChange}>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="CNG">CNG</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Mileage (km)</label>
                            <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Owners</label>
                            <input type="number" name="owners" value={formData.owners} onChange={handleChange} min="1" required />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                                <option value="reserved">Reserved</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Image URLs (comma separated)</label>
                        <textarea
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="https://example.com/car1.jpg, https://example.com/car2.jpg"
                            rows="3"
                        ></textarea>
                        <small>For now, paste direct image links. Storage upload coming soon.</small>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Add Car'} <Save size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddCarModal;
