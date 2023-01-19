// import built-in react modules
import { useEffect, useState }                                  from 'react';

// import downloaded packages
import { BrowserRouter as Router, Routes, Route, Navigate }     from 'react-router-dom';

// import UserContext
import { UserProvider }                                         from './UserContext';

// import pages
import ErrorPage                                                from './pages/ErrorPage';
import Dashboard                                                from './pages/Dashboard';
import Login                                                    from './pages/Login';
import Logout                                                   from './pages/Logout';

// import component
import AppNavbar                                                from './components/AppNavbar';

// import css
import './App.css';


// export the function so that it can be use anywhere
function App() {

  /* set an object state which be provided to all pages as UserContext 
  initial value is null */
  const [user, setUser] = useState({
    username: null,
    displayName: null
  });

  // get the user and displayName items from localStorage
  const localStorageUsername = localStorage.getItem('user')
  const localStorageDisplayname = localStorage.getItem('displayName')

  // get the details of authenticated user from localStorage
  function getUserData(username, displayName) {
    // if there are items on the localStorage set it as the properties of user
    if (username !== null && displayName !==null) {
      setUser({
        username: username,
        displayName: displayName
      })

    // else, set is as null
    } else {
      setUser({
        username: null,
        displayName: null
      })
    }
  }

  // invoke getUserData on page render
  useEffect(() => {
    getUserData(localStorageUsername, localStorageDisplayname);

  // set localStorageUsername and localStorageDisplayname as dependency
  }, [localStorageUsername, localStorageDisplayname]);

  return (
    // use UserProvider to provide the user and setUser as UserContext to all pages
    <UserProvider value={{user, setUser}}>
      <Router>
        <AppNavbar/>
        <Routes>
          {/* "/" is the default route, it will be redirected to /account/login */}
          <Route path="/" element={<Navigate to="/account/login" />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/home/index" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
