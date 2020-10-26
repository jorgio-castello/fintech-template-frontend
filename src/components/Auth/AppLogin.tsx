import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <button 
            onClick={() => loginWithRedirect()}
            className="px-5 py-2 bg-teal-300 rounded shadow text-white"
        >
            Get Started
        </button>
    ) 
}

export default LoginButton;