import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { keys } from 'mobx';

@inject('store')
@observer
class DocumentPage extends Component {
    state = {
        openNewRow: false,
        openNewLang: false,
        // data: {
        //     en: {
        //         translations: {
        //             TEST: 'test',
        //             WATCHNOW: 'Watch now',
        //             'HISTORY.PREV': 'history of previous meetings',
        //         },
        //     },
        //     ru: {
        //         translations: {},
        //     },
        //     uk: {
        //         translations: {},
        //     },
        // },
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

    addLang() {
        const { value } = this.newLang;
        const {
            store: { updateDocument },
            match: {
                params: { id },
            },
        } = this.props;
        updateDocument(id, { [value]: {} });
    }

    render() {
        const {
            store: { getDocumentByID },
            match: {
                params: { id },
            },
            history: { goBack },
        } = this.props;

        const { openNewRow, openNewLang } = this.state;

        const document = getDocumentByID(id);

        // const {
        //     created_date,
        //     description,
        //     id,
        //     name,
        //     owner,
        //     published_date,
        // } = document;
        // console.log(document);

        if (!document) {
            return null;
        }
        const data = document.data ? document.data : {};
        const mainLang = 'en';
        const langs = document.data ? keys(document.data) : [];

        return (
            <Fragment>
                <button onClick={e => goBack()}>Back</button>
                <div className="container">Edit page {name}</div>
                {document ? (
                    <code>
                        {keys(document).map(key => (
                            <div key={key}>{`${key} : ${
                                typeof document[key] === 'object'
                                    ? JSON.stringify(document[key], null, '\t')
                                    : document[key]
                            }`}</div>
                        ))}
                    </code>
                ) : (
                    <div>NO DATA</div>
                )}

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">KEY</th>
                            {langs.map(lang => (
                                <th scope="col" key={lang}>
                                    {lang}
                                </th>
                            ))}
                            {openNewLang && (
                                <th scope="col">
                                    <input
                                        onBlur={e => this.addLang()}
                                        type="text"
                                        placeholder="Type lang"
                                        ref={ref => (this.newLang = ref)}
                                    />
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {(data[mainLang] ? keys(data[mainLang]) : []).map(
                            key => (
                                <tr key={key}>
                                    <th scope="row">
                                        <span>{key} </span>
                                        <button>X</button>
                                    </th>
                                    {langs.map(lang => (
                                        <td key={lang}>
                                            {data[lang][key]
                                                ? data[lang][key]
                                                : '---'}
                                        </td>
                                    ))}
                                </tr>
                            ),
                        )}
                        {openNewRow && (
                            <tr>
                                <td>
                                    <input type="text" placeholder="Type key" />
                                </td>
                                {langs.map(lang => (
                                    <td key={lang}>
                                        <input
                                            type="text"
                                            placeholder={`Type ${lang} value`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )}
                        {/* <tr>
                                <td>
                                    <button
                                        onClick={e =>
                                            this.setState({ openNewRow: true })
                                        }
                                    >
                                        +
                                    </button>
                                </td>
                            </tr> */}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default DocumentPage;
