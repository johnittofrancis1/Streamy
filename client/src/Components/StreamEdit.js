import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, updateStream } from '../actions';
import StreamForm from './StreamForm';
import history from '../history';

class StreamEdit extends React.Component
{
    componentDidMount()
    {
        console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.updateStream(this.props.match.params.id, {...formValues});
        history.push("/streams");
    }

    render()
    {
        if (! this.props.stream)
            return <div>Loading...</div>;
        const {title, description} = this.props.stream;
        return (
            <div className="ui container">
                <StreamForm initialValues={{title, description}} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stream: state.stream
    };
}

export default connect(mapStateToProps, {fetchStream, updateStream})(StreamEdit);