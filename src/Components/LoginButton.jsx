import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Button } from 'react-bootstrap';

export default function LoginButton({children, ...props}) {
    const { loginWithRedirect } = useAuth0(); 
    
    return <Button {...props} onClick={loginWithRedirect}>{children}</Button>
}
