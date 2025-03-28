import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function addUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/adduser', { email, password });
            alert('User added successfully');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-center mb-6">Sign Up Here</h3>
            <form onSubmit={addUser}>
                <input
                    type="email"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Sign Up</button>
            </form>
        </div>
    );
}
