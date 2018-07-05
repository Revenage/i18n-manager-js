import React from 'react';
import Layout from 'components/Layout';

function Form({ children }) {
    return (
        <Layout>
            <div className="row">
                <div className="offset-md-4 col-md-4 ">{children}</div>
            </div>
        </Layout>
    );
}

export default Form;
