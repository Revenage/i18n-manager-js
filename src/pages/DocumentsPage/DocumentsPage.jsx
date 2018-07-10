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

function Card({ id, name, created_date }) {
    const date = new Date(created_date);
    return (
        <div className="col-md-3">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{name || 'No Name'}</h5>
                    <h6 className="card-title">Created: {dateToYMD(date)}</h6>
                    <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p>
                    <NavLink
                        to={`/documents/edit/${id}/`}
                        className="btn btn-primary"
                    >
                        Edit
                    </NavLink>
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
        const { documents } = this.props.store;

        const model = getTable(documents);

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
                                {row.map(item => (
                                    <Card {...item} key={item.id} />
                                ))}
                            </div>
                        ))}
                    </div>
                </Layout>
            </Fragment>
        );
    }
}

export default DocumentsPage;
