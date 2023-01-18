import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';

import AppNavbar from './components/AppNavbar';

import { useEffect, useState }  from 'react';

import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate
}                               from 'react-router-dom';

import { UserProvider }         from './UserContext';

function App() {

  const [user, setUser] = useState({
    username: null,
    displayName: null
  });

  const localStorageUsername = localStorage.getItem('user')
  const localStorageDisplayname = localStorage.getItem('displayName')

  function getUserData(username, displayName) {
    if (username !== null && displayName !==null) {
      setUser({
        username: username,
        displayName: displayName
      })
    } else {
      setUser({
        username: null,
        displayName: null
      })
    }
  }

  useEffect(() => {
    getUserData(localStorageUsername, localStorageDisplayname);
  }, [localStorageUsername, localStorageDisplayname]);

  return (
    <UserProvider value={{user, setUser}}>
      <Router>
        <AppNavbar/>
        <Routes>
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
