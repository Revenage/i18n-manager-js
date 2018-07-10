import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';

@inject('store')
@observer
class DocumentPage extends Component {
    componentDidMount() {
        const {
            store: { fetchDocument },
            match: {
                params: { id },
            },
        } = this.props;

        fetchDocument(id);
    }

    render() {
        const {
            store: { documents },
            match: {
                params: { id: _id },
            },
        } = this.props;
        // const name = documents.find(({ id }) => id === _id);
        // console.log(documents);

        return (
            <Fragment>
                <Navigation />
                <Layout>
                    <div className="container">Edit page {name}</div>
                </Layout>
            </Fragment>
        );
    }
}

export default DocumentPage;
