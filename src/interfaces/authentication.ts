import AuthenticationFetch from "../fetchHandlers/authentication";

export interface AuthenticationContextInterface {
    fetch: AuthenticationFetch,
    oAuthUser: any,
    plaidPublicToken: string | null,
    setPlaidPublicToken: Function,
}

export interface PlaidConfig {
    clientName: string,
    env: string,
    product: string[],
    publicKey: string,
    onSuccess: Function,
}

export interface PlaidAuthenticationResponse {
    plaidPublicToken: string | null,
}

export interface setPlaidTokenResponse {
    success: boolean,
    messages?: any,
}