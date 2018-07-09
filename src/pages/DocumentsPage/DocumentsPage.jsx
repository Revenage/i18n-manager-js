import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';

function Card({ name }) {
    return (
        <div className="col-md-3">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{name || 'No Name'}</h5>
                    <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p>
                    <a href="#" className="btn btn-primary">
                        Edit
                    </a>
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
