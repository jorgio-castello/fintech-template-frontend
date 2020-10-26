import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    
    return (
        <button 
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-teal-500 px-5 py-2 text-white rounded shadow"
        >
            Log Out
        </button>
    );
}

export default LogoutButton;