import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { values } from 'mobx';

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
}

function Card({ id, name, created_date, description, published_date, remove }) {
    const date = new Date(created_date);
    const upDate = published_date && new Date(published_date);
    return (
        <div className="col-md-3">
            <div className="card text-center">
                <div className="card-body">
                    {name && <h5 className="card-title">{name}</h5>}
                    {date && (
                        <h6 className="card-title">
                            Created: {dateToYMD(date)}
                        </h6>
                    )}
                    {upDate && (
                        <span className="card-title">
                            Last update: {dateToYMD(upDate)}
                        </span>
                    )}
                    {description && (
                        <p className="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                        </p>
                    )}
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
        <div className="col-md-3" onClick={e => onClick(e)}>
            <div className="card text-center">
                <div className="card-body">
                    <button type="button" className="btn btn-default btn-lg">
                        <i className="far fa-plus-square fa-10x" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function getTable(documents) {
    const items = values(documents);
    const itemPerRow = 4;
    const len = items.length + 1;
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
        const model = getTable(documents);
        return (
            <Fragment>
                <div className="container">
                    {Boolean(model.length) ? (
                        model.map((row, i) => (
                            <div key={i} className="row mt-3">
                                {row.map(item => (
                                    <Card
                                        {...item}
                                        key={item.id}
                                        remove={id => removeDocument(id)}
                                    />
                                ))}
                                {i + 1 === model.length && (
                                    <Add
                                        key="addbtn"
                                        onClick={e => createDocument()}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <Add onClick={e => createDocument()} />
                    )}
                </div>
            </Fragment>
        );
    }
}

export default DocumentsPage;
