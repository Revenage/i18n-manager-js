import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';

@inject('store')
@observer
class DocumentPage extends Component {
    state = {
        data: {
            en: {
                translations: {
                    TEST: 'test',
                    WATCHNOW: 'Watch now',
                    'HISTORY.PREV': 'history of previous meetings',
                },
            },
            ru: {
                translations: {},
            },
            uk: {
                translations: {},
            },
        },
    };

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
        const { data } = this.state;

        const mainLang = 'en';
        const langs = Object.keys(data);
        const rows = data[mainLang].translations;
        const rowsKeys = Object.keys(rows);

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

                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>KEY</th>
                                {langs.map(lang => <th key={lang}>{lang}</th>)}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {rowsKeys.map(key => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    {langs.map(lang => (
                                        <td key={lang}>
                                            {data[lang].translations[key]}
                                        </td>
                                    ))}
                                    <td>X</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Layout>
            </Fragment>
        );
    }
}

export default DocumentPage;
