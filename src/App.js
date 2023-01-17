import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

import AppNavbar from './components/AppNavbar';

import { useState }  from 'react';

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

  return (
    <UserProvider value={{user, setUser}}>
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/account/login" />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/home/index" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
