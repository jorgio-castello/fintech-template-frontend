import React, { useContext, useState } from 'react';
import PlaidFetch from '../fetchHandlers/plaid';
import { AuthenticationContextInterface } from '../interfaces/authentication';
import { PlaidAccounts, PlaidTransactions } from '../interfaces/plaid';
import { AuthenticationContext } from './App';

const PlaidAccount = ({data}: any) => {
    const { accountName, balances } = data;
    return (
        <div className="flex flex-col justify-start items-start bg-gray-100 rounded shadow w-100 mt-2 p-5">
            <p className="text-blue-500">Account Name: {accountName}</p>
            <p>Current Balance: {balances.current}</p>
        </div>
    );
};

const PlaidTransaction = ({data}: any) => {
    const { amount, category, date, merchantName } = data;
    return (
        <div className="flex flex-col justify-start items-start bg-gray-100 rounded shadow w-100 mt-2 p-5">
            <p className="text-blue-500">Transaction Amount: {amount}</p>
            <p>Category: {category.join(', ')}</p>
            <p>Date: {date}</p>
            <p>Merchant Name: {merchantName}</p>
        </div>
    )
}

const Plaid = () => {
    const authentication = useContext<AuthenticationContextInterface>(AuthenticationContext);
    const plaidFetch = new PlaidFetch();
    
    const [accounts, setAccounts] = useState<PlaidAccounts[]>([]);
    const [transactions, setTransactions] = useState<PlaidTransactions[]>([]);

    const getAccounts = () => {
        plaidFetch.getAccounts(authentication.oAuthUser.sub, authentication.plaidPublicToken)
            .then(setAccounts)
            .catch(err => { throw new Error(err) });
    }

    const getTransactions = () => {
        plaidFetch.getTransactions(authentication.oAuthUser.sub, authentication.plaidPublicToken)
            .then(setTransactions)
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
                    Get Your Accounts
                </button>  
                <button
                    className="bg-teal-500 px-5 py-2 text-white rounded shadow"
                    onClick={getTransactions}
                >
                    Get Today's Transactions
                </button>
            </div>
            
            <div className="flex flex-col w-full mt-10 justify-start">
                <h3 className="text-2xl font-thin">Accounts</h3>
                <div className="mt-2">
                    {accounts.length > 0 && (
                        accounts.map((account, idx) => (
                            <PlaidAccount data={account} key={idx} />
                        ))
                    )}
                </div>
            </div>
            <div className="flex flex-col w-full mt-10 justify-start">
            <h3 className="text-2xl font-thin">Transactions</h3>
            <div className="mt-2">
                {transactions.length > 0 && (
                    transactions.map((transaction, idx) => (
                        <PlaidTransaction data={transaction} key={idx} />
                    ))
                )}
            </div>
            </div>
        </div>
    );
};

export default Plaid;

