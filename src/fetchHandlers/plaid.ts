class PlaidFetch {
    private serverHost: string = process.env.REACT_APP_APP_SERVER_HOST || 'localhost:3001';
    constructor () {}

    getAccounts(auth0Token: string, plaidPublicToken: string | null): Promise<any> { // need to create Plaid Types
        return fetch(`${this.serverHost}/plaid/getAccounts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auth0Token, plaidPublicToken }),
        })
            .then(res => res.json())
            .catch(err => { throw new Error(err) });
    }

    getTransactions(auth0Token: string, plaidPublicToken: string | null, startDate?: string, endDate?: string): Promise<any> {
        if (! startDate || ! endDate) { // if dates are not passed, show transactions of the day
            let tempDate = new Date();
            let tempDateStr = `${tempDate.getFullYear()}-${`${tempDate.getMonth() + 1}`.padStart(2, '0')}-${`${tempDate.getDate()}`.padStart(2, '0')}`;
            startDate = tempDateStr;
            endDate = tempDateStr; 
        }
        
        return fetch(`${this.serverHost}/plaid/getTransactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auth0Token, plaidPublicToken, startDate, endDate })
        })
            .then(res => res.json())
            .catch(err => { throw new Error(err) });
    }
}

export default PlaidFetch;