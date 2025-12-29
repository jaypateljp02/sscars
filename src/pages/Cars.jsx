import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import CarCard from '../components/CarCard';
import './Cars.css';

const AvailableCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for initial design phase
    const mockCars = [
        {
            id: '1',
            make: 'Maruti Suzuki',
            model: 'Swift ZXI',
            year: 2021,
            price: 645000,
            mileage: 24000,
            fuel_type: 'Petrol',
            owners: 1,
            images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            status: 'available'
        },
        {
            id: '2',
            make: 'Hyundai',
            model: 'Creta SX',
            year: 2022,
            price: 1450000,
            mileage: 18000,
            fuel_type: 'Diesel',
            owners: 1,
            images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            status: 'available'
        },
        {
            id: '3',
            make: 'Toyota',
            model: 'Innova Crysta',
            year: 2019,
            price: 1875000,
            mileage: 56000,
            fuel_type: 'Diesel',
            owners: 2,
            images: ['https://images.unsplash.com/photo-1621235149303-34e262bb8095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            status: 'sold'
        },
        {
            id: '4',
            make: 'Honda',
            model: 'City V',
            year: 2020,
            price: 925000,
            mileage: 32000,
            fuel_type: 'Petrol',
            owners: 1,
            images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            status: 'available'
        }
    ];

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data, error } = await supabase
                    .from('cars')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data && data.length > 0) {
                    setCars(data);
                } else {
                    setCars(mockCars);
                }
            } catch (err) {
                console.error('Error fetching cars:', err);
                setCars(mockCars);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return (
        <div className="cars-page container">
            <header className="page-header">
                <h1>Available <span className="text-gold">Cars</span></h1>
                <p>Browse our hand-picked collection of certified pre-owned vehicles.</p>
            </header>

            {loading ? (
                <div className="loading">Loading showroom...</div>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableCars;
