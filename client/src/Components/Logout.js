import React from 'react';
import { connect } from 'react-redux';

import { logOut } from '../actions/auth';
import Modal from './Modal';
import history from '../history';

class StreamDelete extends React.Component
{
    onSubmit = () => {
        this.props.logOut();
    }

    onDismiss = () => {
        history.push("/streams");
    }

    renderActions = () => (
        <React.Fragment>
            <button onClick={this.onSubmit} className="ui button negative">Logout</button>
            <button onClick={this.onDismiss} className="ui button">Cancel</button>
        </React.Fragment>
    )

    render()
    {
        return (
            <div>
                <Modal title="Logout" actions={this.renderActions()} onDismiss={this.onDismiss}>
                    <h5>Are you sure you want to Logout: {this.props.currentUser.name} ?</h5>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.auth};
}


export default connect(mapStateToProps, {logOut})(StreamDelete);