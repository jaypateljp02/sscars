import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, Info, Phone, ShieldCheck, Tag } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', path: '/', icon: <Info size={18} /> },
        { title: 'Available Cars', path: '/cars', icon: <Car size={18} /> },
        { title: 'Offers', path: '/offers', icon: <Tag size={18} /> },
        { title: 'Accessories', path: '/accessories', icon: <ShieldCheck size={18} /> },
        { title: 'Contact', path: '/contact', icon: <Phone size={18} /> },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <span className="logo-ss">SS</span>
                    <span className="logo-cars">CARS</span>
                    <span className="logo-loc">RATNAGIRI</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <Link key={link.title} to={link.path} className="nav-link">
                            {link.title}
                        </Link>
                    ))}
                    {/* Admin link removed as requested */}
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.title}
                            to={link.path}
                            className="mobile-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="icon">{link.icon}</span>
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
