import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import AuthService from './service/auth_service';

const authService = new AuthService();

ReactDOM.render(<Routes authService={authService}/>, document.getElementById('root'));
