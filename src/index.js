import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import DocumentsPage from 'pages/DocumentsPage';
import store from 'store';

function isAuthorized() {
    return localStorage.getItem('token');
}

function PrivateRoute(props) {
    return isAuthorized() ? <Route {...props} /> : <Redirect to="/login" />;
}

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/documents" component={DocumentsPage} />
                    <PrivateRoute path="/signup" component={SignUpPage} />
                    <PrivateRoute path="/" component={DocumentsPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

render(<Root />, document.getElementById('app'));
