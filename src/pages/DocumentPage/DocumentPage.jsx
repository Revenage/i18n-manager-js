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
            store: { getDocumentByID, documents },
            match: {
                params: { id },
            },
            history: { goBack },
        } = this.props;
        const document = getDocumentByID(id);

        // const {
        //     created_date,
        //     description,
        //     id,
        //     name,
        //     owner,
        //     published_date,
        // } = document;

        return (
            <Fragment>
                <Navigation />
                <Layout>
                    <button onClick={e => goBack()}>Back</button>
                    <div className="container">Edit page {name}</div>
                    {document ? (
                        <div>
                            {Object.keys(document).map(key => (
                                <div key={key}>{`${key} : ${
                                    document[key]
                                }`}</div>
                            ))}
                        </div>
                    ) : (
                        <div>NO DATA</div>
                    )}
                </Layout>
            </Fragment>
        );
    }
}

export default DocumentPage;
