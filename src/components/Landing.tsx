import React from 'react';
import LoginButton from './Auth/AppLogin';

const Landing = () => {
    return (
        <div className="rounded shadow-lg w-1/2 bg-gray-100 bg-opacity-50 p-5">
            <h2 className="text-3xl text-teal-300 font-thin">FinTech Template</h2>
            <div className="text-left font-thin py-5">
                <p>- Utilizes Auth0 User Authentication</p>
                <p>- Integrates Directly with Plaid</p>
            </div>
            <LoginButton />
        </div>
    );
}

export default Landing;