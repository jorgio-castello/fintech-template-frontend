import React, { useEffect, useState } from 'react';
import LogoutButton from './Auth/AppLogout';
import PlaidLogin from './Auth/PlaidLogin';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationFetch from '../fetchHandlers/authentication';
import { AuthenticationContextInterface } from '../interfaces/authentication';
import Landing from './Landing';
import Plaid from './Plaid';

const authenticationFetch = new AuthenticationFetch();
const AuthenticationContext = React.createContext<AuthenticationContextInterface>({
  fetch: authenticationFetch,
  oAuthUser: '',
  plaidPublicToken: null,
  setPlaidPublicToken: () => {}
});

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const [plaidPublicToken, setPlaidPublicToken] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      authenticationFetch
        .authenticatePlaid(user.sub)
        .then(({ plaidPublicToken }) => setPlaidPublicToken(plaidPublicToken));
    }
  }, [isAuthenticated]);
  
  return (
    <div className="flex container h-screen w-screen justify-center items-center mx-auto">
      <div className="flex justify-center items-center w-1/2 text-center">
        {!isAuthenticated && <Landing />}
        {isAuthenticated && (
          <AuthenticationContext.Provider value={{ fetch: authenticationFetch, oAuthUser: user, plaidPublicToken, setPlaidPublicToken }}>
            <div className="w-full p-10">
              { ! plaidPublicToken  && <PlaidLogin />}
              <LogoutButton />
              { plaidPublicToken && <Plaid /> }
            </div>
          </AuthenticationContext.Provider> 
        )}
      </div>
    </div>
  );
}

export { AuthenticationContext };
export default App;
