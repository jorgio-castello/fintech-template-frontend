import { PlaidAuthenticationResponse, setPlaidTokenResponse } from "../interfaces/authentication";

class AuthenticationFetch {
    private serverHost: string = process.env.REACT_APP_APP_SERVER_HOST || 'http://localhost:3001';
    constructor() {

        this.authenticatePlaid = this.authenticatePlaid.bind(this);
        this.setPlaidToken = this.setPlaidToken.bind(this);
    }

    authenticatePlaid(sub: string): Promise<PlaidAuthenticationResponse> {
        return fetch(`${this.serverHost}/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sub }),
        })
        .then(res => res.json())
        .catch((err: any) => { throw new Error(err) });
    }

    setPlaidToken(auth0Token: string, plaidPublicToken: string, metadata: any): Promise<setPlaidTokenResponse> {
        return fetch(`${this.serverHost}/authenticate/setPlaidToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auth0Token, plaidPublicToken, metadata }),
        })
        .then(res => res.json())
        .catch((err: any) => { throw new Error(err) })
    }

}

export default AuthenticationFetch;