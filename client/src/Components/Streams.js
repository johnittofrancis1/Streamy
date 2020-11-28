import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllStreams } from '../actions';
import { closeLogin } from '../actions/auth';
import history from '../history';

class Streams extends React.Component
{
    componentDidMount()
    {
        this.props.fetchAllStreams();
        this.props.closeLogin();
    }

    renderOperationButtons = (stream) => {
        if (this.props.loc !== "side-menu")
        {
            if (stream.user._id === this.props.currentUser._id)
            {
                return (
                    <div className="right floated content">
                        <Link to={`/streams/edit/${stream._id}`} className="ui primary button">Edit</Link>
                        <Link to={`/streams/delete/${stream._id}`} className="ui negative button">Delete</Link>
                    </div>
                );
            }
        }
    }

    renderStreamsList = () => {
        return this.props.streams.map(stream => {
            if (!(this.props.noShow && stream._id === this.props.noShow))
            {
                return (
                    <div onClick={() => history.push(`/streams/${stream._id}`)} key={stream._id} className="item stream">
                        {this.renderOperationButtons(stream)}
                        <i className="large camera icon"></i>
                        <div className="content">
                            <h3 className="header">{ stream.title }</h3>
                            <div className="description">
                                <h5>From { stream.user.name } </h5>    
                                <p> { stream.description } </p>
                            </div>
                        </div>
                    </div>
                );
            }
            return <div key={stream._id}></div>;
        });
    }

    render()
    {
        return (
            <div>
                <div className="ui large relaxed divided list">
                    {this.renderStreamsList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {streams: Object.values(state.streams), currentUser: state.auth};
}

export default connect(mapStateToProps, { fetchAllStreams, closeLogin })(Streams);