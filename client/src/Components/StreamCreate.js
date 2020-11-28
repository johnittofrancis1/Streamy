import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../actions';
import StreamForm from './StreamForm';
import history from '../history';

class StreamCreate extends React.Component
{
    onSubmit = (formValues) => {
        this.props.createStream({...formValues, user: this.props.currentUser._id});
        history.push("/streams");
    }

    render()
    {
        return (
            <div className="ui container">
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.auth}
}

export default connect(mapStateToProps, {createStream})(StreamCreate);