// import built-in react modules
import { useContext, useEffect } 		from 'react';

// import UserContext
import UserContext 						from '../UserContext';

// import downloaded packages
import { Navigate } 					from 'react-router-dom';


// export the function so that it can be use anywhere
export default function Logout() {
    
    // get the setUser from UserContext
    const { setUser } = useContext(UserContext);

    /* to reset the user in the UserContext and
    clear the contents of localStorage on page render */
    useEffect(() => {
        setUser({
            username: null,
            displayName: null
        });
        localStorage.clear();
    });
    
    return (
        // navigate back to the default route
        <Navigate to="/" />
    )
}