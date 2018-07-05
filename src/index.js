import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import DocumentsPage from 'pages/DocumentsPage';

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/documents" component={DocumentsPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/" render={() => <div>TEST</div>} />
            </Switch>
        </BrowserRouter>
    );
}

render(<Root />, document.getElementById('app'));
