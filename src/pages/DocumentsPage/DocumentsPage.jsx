import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
}

function Card({ id, name, created_date, published_date, remove, description }) {
    const date = new Date(created_date);
    const upDate = published_date && new Date(published_date);
    return (
        <div className="col-md-3">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{name || 'No Name'}</h5>
                    <h6 className="card-title">Created: {dateToYMD(date)}</h6>
                    {upDate && (
                        <span className="card-title">
                            Last update: {dateToYMD(upDate)}
                        </span>
                    )}
                    <p className="card-text">{description}</p>
                    <NavLink
                        to={`/documents/edit/${id}/`}
                        className="btn btn-primary"
                    >
                        Edit
                    </NavLink>
                    <button
                        className="btn btn-danger"
                        onClick={e => remove(id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

function Add({ onClick }) {
    return (
        <div className="col-md-3" onClick={e => onClick()}>
            <div className="card text-center">
                <div className="card-body">
                    <button className="btn btn-success">ADD NEW</button>
                </div>
            </div>
        </div>
    );
}

function getTable(items) {
    const itemPerRow = 4;
    const len = items.length;
    const rowsLength =
        Math.floor(len / itemPerRow) + (len % itemPerRow > 0 ? 1 : 0);
    return Array.apply(null, Array(rowsLength)).map((val, index) => {
        const arr = items.slice(index * itemPerRow, (index + 1) * itemPerRow);
        return arr;
    });
}

@inject('store')
@observer
class DocumentsPage extends Component {
    componentDidMount() {
        const { fetchDocuments } = this.props.store;
        fetchDocuments();
    }

    render() {
        const { documents, removeDocument, createDocument } = this.props.store;

        const model = getTable([...documents, { id: 'add' }]);

        return (
            <Fragment>
                <Navigation />
                <Layout>
                    <div className="container">
                        {model.map((row, i) => (
                            <div
                                key={i}
                                className="row align-items-center mt-3"
                            >
                                {row.map(item => {
                                    if (item.id === 'add') {
                                        return (
                                            <Add
                                                key={item.id}
                                                onClick={e => createDocument()}
                                            />
                                        );
                                    }
                                    return (
                                        <Card
                                            {...item}
                                            key={item.id}
                                            remove={id => removeDocument(id)}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </Layout>
            </Fragment>
        );
    }
}

export default DocumentsPage;
