// import built-in react modules
import ReactDOM     from 'react-dom/client';
import React        from 'react';

// import App
import App          from './App';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
