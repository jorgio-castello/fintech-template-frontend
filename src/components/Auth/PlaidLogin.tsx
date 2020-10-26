import React, { useContext } from 'react';
import {usePlaidLink} from "react-plaid-link";
import createPlaidConfig from '../../config/plaid';
import { AuthenticationContextInterface } from '../../interfaces/authentication';
import { AuthenticationContext } from '../App';

export default function() {
    const authentication = useContext<AuthenticationContextInterface>(AuthenticationContext);
    const plaidConfig = createPlaidConfig((plaidPublicToken: any, plaidMetadata: any) => {
       authentication
            .fetch
            .setPlaidToken(authentication.oAuthUser.sub, plaidPublicToken, plaidMetadata)
            .then(({ success }) => {
                if (success) {
                    authentication.setPlaidPublicToken(plaidPublicToken);
                } else {} // need to handle the error case
            });
    });

    const { open, ready } = usePlaidLink(plaidConfig);
    return (
        <button 
            onClick={() => open()} 
            disabled={!ready}
            className="bg-blue-500 px-5 py-2 text-white rounded shadow mr-2"
        >
            Connect Plaid
        </button>
    )
}