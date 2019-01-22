import React from 'react';
import Navigation from 'components/Navigation';
import DevTools from 'mobx-react-devtools';

function Layout({ children }) {
    return (
        <div className="container">
            <Navigation />
            <div className="row">
                <div className="col-md-12">{children}</div>
            </div>
            <DevTools />
        </div>
    );
}

export default Layout;
