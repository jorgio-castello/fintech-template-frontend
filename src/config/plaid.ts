import { PlaidConfig } from "../interfaces/authentication"

export default (onSuccess: Function): PlaidConfig => ({
    clientName: process.env.REACT_APP_APPLICATION_NAME || '',
    env: process.env.REACT_APP_PLAID_ENVIRONMENT || '',
    product: ['auth', 'transactions'],
    publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY || '',
    onSuccess,
});