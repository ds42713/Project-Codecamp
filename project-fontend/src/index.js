import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorContextProvider from './contexts/ErrorContext';
import AuthContextProvider from './contexts/AuthContext';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorContextProvider>
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </ErrorContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

