import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function addUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/login', { email, password });
            if (response.status === 200) {
                alert('User Found');
                navigate(`/page?email=${email}`);  // Passing email in query parameters
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert('User not found');
                }
            } else {
                console.error("Network or server error", error);
                alert('There was an issue connecting to the server.');
            }
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-center mb-6">Login Here</h3>
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
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Log In
                </button>
            </form>
        </div>
    );
}
