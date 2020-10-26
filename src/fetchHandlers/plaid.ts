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
}

export default PlaidFetch;