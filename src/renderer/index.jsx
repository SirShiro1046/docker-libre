import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/styles.css';
import '../styles/navbar.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ...existing code...
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>
);
