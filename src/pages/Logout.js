import { useContext, useEffect } 		from 'react';
import { Navigate } 					from 'react-router-dom';

import UserContext 						from '../UserContext';

export default function Logout() {
    
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        setUser({
            username: null,
            displayName: null
        });
        localStorage.clear();
    });
    
    return (
        <Navigate to="/" />
    )
}