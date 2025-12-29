import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Car, Tag, ShoppingBag, LogOut, Plus, Star, X } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminAddCarModal from '../components/AdminAddCarModal';
import AdminAddOfferModal from '../components/AdminAddOfferModal';
import AdminAddAccessoryModal from '../components/AdminAddAccessoryModal';
import AdminAddReviewModal from '../components/AdminAddReviewModal';
import './Admin.css';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        cars: [],
        offers: [],
        accessories: [],
        reviews: [],
        totalCars: 0,
        totalSold: 0,
        totalOffers: 0
    });

    // Modals
    const [showCarModal, setShowCarModal] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [showAccessoryModal, setShowAccessoryModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error || !session) {
                    setUser(null);
                } else {
                    setUser(session.user);
                    fetchDashboardData();
                }
            } catch (err) {
                console.error('Error checking session:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch Cars
            const { data: cars } = await supabase
                .from('cars')
                .select('*')
                .order('created_at', { ascending: false });

            // Fetch Offers
            const { data: offers } = await supabase
                .from('offers')
                .select('*')
                .order('created_at', { ascending: false });

            // Fetch Accessories
            const { data: accessories } = await supabase
                .from('accessories')
                .select('*')
                .order('created_at', { ascending: false });

            // Fetch Reviews
            const { data: reviews } = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false });

            setDashboardData({
                cars: cars || [],
                offers: offers || [],
                accessories: accessories || [],
                reviews: reviews || [],
                totalCars: cars?.filter(c => c.status === 'available').length || 0,
                totalSold: cars?.filter(c => c.status === 'sold').length || 0,
                totalOffers: offers?.length || 0
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            alert('Failed to load dashboard data');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const handleDeleteCar = async (id) => {
        if (!confirm('Are you sure you want to delete this car?')) return;

        try {
            const { error } = await supabase.from('cars').delete().eq('id', id);
            if (error) throw error;
            // Optimistic update or refresh
            fetchDashboardData();
        } catch (error) {
            console.error('Error deleting car:', error);
            alert('Failed to delete car');
        }
    };

    const handleToggleSold = async (car) => {
        const newStatus = car.status === 'sold' ? 'available' : 'sold';
        try {
            const { error } = await supabase
                .from('cars')
                .update({ status: newStatus })
                .eq('id', car.id);

            if (error) throw error;
            fetchDashboardData();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDeleteOffer = async (id) => {
        if (!confirm('Delete this offer?')) return;
        try {
            const { error } = await supabase.from('offers').delete().eq('id', id);
            if (error) throw error;
            fetchDashboardData();
        } catch (error) {
            console.error('Error deleting offer:', error);
            alert('Failed to delete offer');
        }
    };

    const handleDeleteAccessory = async (id) => {
        if (!confirm('Delete this accessory?')) return;
        try {
            const { error } = await supabase.from('accessories').delete().eq('id', id);
            if (error) throw error;
            fetchDashboardData();
        } catch (error) {
            console.error('Error deleting accessory:', error);
            alert('Failed to delete accessory');
        }
    };

    const handleDeleteReview = async (id) => {
        if (!confirm('Delete this review?')) return;
        try {
            const { error } = await supabase.from('reviews').delete().eq('id', id);
            if (error) throw error;
            fetchDashboardData();
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };

    if (loading) return <div className="loading">Checking authority...</div>;

    if (!user) {
        return <AdminLogin onLogin={(user) => {
            setUser(user);
            fetchDashboardData();
        }} />;
    }

    return (
        <div className="admin-dashboard container">
            <header className="dashboard-header">
                <div>
                    <h1>Admin <span className="text-gold">Panel</span></h1>
                    <p>Welcome back, {user.email}</p>
                </div>
                <button onClick={handleLogout} className="btn btn-outline glass" style={{ padding: '0.6rem 1.2rem' }}>
                    <LogOut size={18} /> Logout
                </button>
            </header>

            <div className="stats-grid">
                <div className="stat-card glass">
                    <h4>Active Listings</h4>
                    <p className="value">{dashboardData.totalCars}</p>
                </div>
                <div className="stat-card glass">
                    <h4>Sold Cars</h4>
                    <p className="value">{dashboardData.totalSold}</p>
                </div>
                <div className="stat-card glass">
                    <h4>Active Offers</h4>
                    <p className="value">{dashboardData.totalOffers}</p>
                </div>
            </div>

            <div className="admin-actions">
                <div className="action-card glass">
                    <Car size={40} className="text-gold" />
                    <h3>Add New Car</h3>
                    <button className="btn btn-primary" onClick={() => setShowCarModal(true)}>
                        <Plus size={18} /> Add Car
                    </button>
                </div>

                <div className="action-card glass">
                    <Tag size={40} className="text-gold" />
                    <h3>Create Offer</h3>
                    <button className="btn btn-primary" onClick={() => setShowOfferModal(true)}>
                        <Plus size={18} /> New Offer
                    </button>
                </div>

                <div className="action-card glass">
                    <ShoppingBag size={40} className="text-gold" />
                    <h3>Add Accessory</h3>
                    <button className="btn btn-primary" onClick={() => setShowAccessoryModal(true)}>
                        <Plus size={18} /> Add Item
                    </button>
                </div>

                <div className="action-card glass">
                    <Star size={40} className="text-gold" />
                    <h3>Add Review</h3>
                    <button className="btn btn-primary" onClick={() => setShowReviewModal(true)}>
                        <Plus size={18} /> Add Review
                    </button>
                </div>
            </div>

            {/* Inventory Section */}
            <div className="admin-section glass p-4 rounded-lg">
                <div className="section-header">
                    <h2>Current Inventory</h2>
                </div>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Make/Model</th>
                                <th>Year</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.cars.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">No cars found. Add one!</td>
                                </tr>
                            ) : (
                                dashboardData.cars.map(car => (
                                    <tr key={car.id}>
                                        <td>{car.make} {car.model}</td>
                                        <td>{car.year}</td>
                                        <td>₹{car.price.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${car.status === 'sold' ? 'badge-sold' : 'badge-available'}`}>
                                                {car.status}
                                            </span>
                                        </td>
                                        <td className="action-btn-group">
                                            <button
                                                className="btn-icon btn-sold"
                                                title={car.status === 'sold' ? 'Mark Available' : 'Mark Sold'}
                                                onClick={() => handleToggleSold(car)}
                                            >
                                                <ShoppingBag size={18} />
                                            </button>
                                            <button
                                                className="btn-icon btn-delete"
                                                title="Delete"
                                                onClick={() => handleDeleteCar(car.id)}
                                            >
                                                <LogOut size={18} style={{ transform: 'rotate(180deg)' }} /> {/* Using logout icon as delete for now, or X */}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Offers Section */}
            <div className="admin-section glass p-4 rounded-lg">
                <div className="section-header">
                    <h2>Active Offers</h2>
                </div>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Expiry</th>
                                <th>Tag</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.offers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No active offers.</td>
                                </tr>
                            ) : (
                                dashboardData.offers.map(offer => (
                                    <tr key={offer.id}>
                                        <td>{offer.title}</td>
                                        <td>{offer.expiry}</td>
                                        <td>{offer.tag}</td>
                                        <td>
                                            <button
                                                className="btn-icon btn-delete"
                                                onClick={() => handleDeleteOffer(offer.id)}
                                            >
                                                <X size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Accessories Section */}
            <div className="admin-section glass p-4 rounded-lg">
                <div className="section-header">
                    <h2>Accessories Catalog</h2>
                </div>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.accessories.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No accessories found.</td>
                                </tr>
                            ) : (
                                dashboardData.accessories.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button
                                                className="btn-icon btn-delete"
                                                onClick={() => handleDeleteAccessory(item.id)}
                                            >
                                                <X size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="admin-section glass p-4 rounded-lg">
                <div className="section-header">
                    <h2>Customer Reviews</h2>
                </div>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Car</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.reviews.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No reviews found.</td>
                                </tr>
                            ) : (
                                dashboardData.reviews.map(review => (
                                    <tr key={review.id}>
                                        <td>{review.name}</td>
                                        <td>{review.car}</td>
                                        <td style={{ color: 'var(--accent-gold)' }}>{'★'.repeat(review.rating)}</td>
                                        <td>
                                            <button
                                                className="btn-icon btn-delete"
                                                onClick={() => handleDeleteReview(review.id)}
                                            >
                                                <X size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {showCarModal && (
                <AdminAddCarModal
                    onClose={() => setShowCarModal(false)}
                    onCarAdded={() => {
                        setShowCarModal(false);
                        fetchDashboardData();
                    }}
                />
            )}

            {showOfferModal && (
                <AdminAddOfferModal
                    onClose={() => setShowOfferModal(false)}
                    onOfferAdded={() => {
                        setShowOfferModal(false);
                        fetchDashboardData();
                    }}
                />
            )}

            {showAccessoryModal && (
                <AdminAddAccessoryModal
                    onClose={() => setShowAccessoryModal(false)}
                    onAdded={() => {
                        setShowAccessoryModal(false);
                        fetchDashboardData();
                    }}
                />
            )}

            {showReviewModal && (
                <AdminAddReviewModal
                    onClose={() => setShowReviewModal(false)}
                    onAdded={() => {
                        setShowReviewModal(false);
                        fetchDashboardData();
                    }}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
