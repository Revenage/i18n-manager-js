import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class DocumentsPage extends Component {
    componentDidMount() {
        const { fetchDocuments } = this.props.store;
        fetchDocuments();
    }

    render() {
        const { documents } = this.props.store;
        return (
            <div className="container-fluid">
                <div className="row">Documents</div>
                <ul>
                    {documents.map(({ name, id }) => <li key={id}>{name}</li>)}
                </ul>
            </div>
        );
    }
}

export default DocumentsPage;
