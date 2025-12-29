import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, Lock, User } from 'lucide-react';
import './Admin.css';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            if (data.user) onLogin(data.user);
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-card glass fade-in">
                <div className="login-header">
                    <div className="logo">
                        <span className="logo-ss">SS</span>
                        <span className="logo-cars">CARS</span>
                    </div>
                    <h2>Admin Login</h2>
                    <p>Secure access for showroom staff</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <User size={20} />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
