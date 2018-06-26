import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

function Root() {
    return <div>ReactJS Root element</div>;
}

render(<Root />, document.getElementById('app'));
