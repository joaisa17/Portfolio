import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

export default function Auth0ProviderWithHistory({ children }) {
    const history = useHistory();

    const onRedirectCallback = appState => {
        history.push(appState?.returnTo || window.location.pathname);
    }

    return <Auth0Provider
        domain="joaisa17.eu.auth0.com"
        clientId="pHLYa14dGMwuw5ANvGIH1iLVT3fJp38P"
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        {children}
    </Auth0Provider>
}
