import React, { useContext, useState } from 'react';
import PlaidFetch from '../fetchHandlers/plaid';
import { AuthenticationContextInterface } from '../interfaces/authentication';
import { AuthenticationContext } from './App';

const Plaid = () => {
    const authentication = useContext<AuthenticationContextInterface>(AuthenticationContext);
    const plaidFetch = new PlaidFetch();
    
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const getAccounts = () => {
        plaidFetch.getAccounts(authentication.oAuthUser.sub, authentication.plaidPublicToken)
            .then(setAccounts)
            .catch(err => { throw new Error(err) });
    }

    return (
        <div className="mt-5">
            <p className="text-4xl font-thin text-blue-500">Interact with Plaid</p>
            <div className="flex w-full justify-center mt-5">
                <button 
                    className="bg-blue-500 px-5 py-2 text-white rounded shadow mr-2"
                    onClick={getAccounts}
                >
                    Get Accounts
                </button>  
                <button
                    className="bg-teal-500 px-5 py-2 text-white rounded shadow"
                >
                    Get Transactions
                </button>
            </div>
            
            <div className="flex w-full mt-10 justify-start">
                <h3 className="text-2xl font-thin">Accounts</h3>
                {accounts.length > 0 && (
                    accounts.map((account, idx) => (
                        <div key={idx} className="w-1/2 bg-gray-400">
                            <p >{JSON.stringify(account)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Plaid;

