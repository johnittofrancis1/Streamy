import React from 'react';
import { connect } from 'react-redux';

import { deleteStream, fetchStream } from '../actions';
import Modal from './Modal';
import history from '../history';

class StreamDelete extends React.Component
{
    componentDidMount()
    {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = () => {
        this.props.deleteStream(this.props.match.params.id);
        history.push("/streams");
    }

    onDismiss = () => {
        history.push("/streams");
    }

    renderActions = () => (
        <React.Fragment>
            <button onClick={this.onSubmit} className="ui button negative">Delete</button>
            <button onClick={this.onDismiss} className="ui button">Cancel</button>
        </React.Fragment>
    )

    render()
    {
        if (! this.props.stream)
            return <div>Loading...</div>;
        return (
            <div>
                <Modal title="Delete Stream" actions={this.renderActions()} onDismiss={this.onDismiss}>
                    <h5>Are you sure you want to delete this Stream?</h5>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {stream: state.stream};
}


export default connect(mapStateToProps, {deleteStream, fetchStream})(StreamDelete);