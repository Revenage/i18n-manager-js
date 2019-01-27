import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { keys } from 'mobx';

@inject('store')
@observer
class DocumentPage extends Component {
    state = {
        openNewRow: false,
        openNewLang: false,
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

    async addLang(e) {
        const { value } = e.target;
        const {
            store: { addLanguage },
            match: {
                params: { id },
            },
        } = this.props;
        if (value.length) {
            await addLanguage(id, value);
        }

        this.setState({ openNewLang: false });
    }

    async removeLang(lang) {
        const {
            store: { removeLanguage },
            match: {
                params: { id },
            },
        } = this.props;
        await removeLanguage(id, lang);
    }

    async addKey(e) {
        const { value } = e.target;
        const {
            store: { addKey },
            match: {
                params: { id },
            },
        } = this.props;
        if (value.length) {
            await addKey(id, value);
        }

        this.setState({ openNewRow: false });
    }

    async removeKey(key) {
        const {
            store: { removeKey },
            match: {
                params: { id },
            },
        } = this.props;
        await removeKey(id, key);
    }

    async addValue(e, lang, key) {
        const { value } = e.target;
        const {
            store: { addValue },
            match: {
                params: { id },
            },
        } = this.props;
        if (value.length) {
            await addValue(id, lang, key, value);
        }
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
                                    <button
                                        onClick={e => this.removeLang(lang)}
                                    >
                                        -
                                    </button>
                                </th>
                            ))}
                            {openNewLang ? (
                                <th scope="col">
                                    <input
                                        onBlur={e => this.addLang(e)}
                                        type="text"
                                        placeholder="Type lang"
                                    />
                                </th>
                            ) : (
                                <th
                                    onClick={e =>
                                        this.setState({ openNewLang: true })
                                    }
                                >
                                    +
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
                                        <button
                                            onClick={e => this.removeKey(key)}
                                        >
                                            X
                                        </button>
                                    </th>
                                    {langs.map(lang => (
                                        <td key={lang}>
                                            {data[lang][key] ? (
                                                data[lang][key]
                                            ) : (
                                                <input
                                                    type="text"
                                                    placeholder="Type value"
                                                    onBlur={e =>
                                                        this.addValue(
                                                            e,
                                                            lang,
                                                            key,
                                                        )
                                                    }
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ),
                        )}
                        {openNewRow ? (
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Type key"
                                        onBlur={e => this.addKey(e)}
                                    />
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
                        ) : (
                            <tr>
                                <td>
                                    <button
                                        onClick={e =>
                                            this.setState({ openNewRow: true })
                                        }
                                    >
                                        +
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default DocumentPage;
