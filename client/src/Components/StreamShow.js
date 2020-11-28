import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import Streams from './Streams';
import Modal from './Modal';
import { fetchStream } from '../actions';

class StreamShow extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {showStreamLinkModal: false};
        this.videoPlayerRef = React.createRef();
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate()
    {
        this.buildPlayer();
    }

    componentWillUnmount()
    {
        if (this.player)
            this.player.destroy();
    }

    buildPlayer = () => {
        if (this.player || !this.props.stream)
            return;
        
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoPlayerRef.current);
        this.player.load();
    }

    renderStreamLinkIcon = () => {
        if (this.props.stream.user._id === this.props.currentUser._id)
            return <i onClick={() => this.setState({showStreamLinkModal: true})} style={{marginTop: '5px', marginRight: '5px'}} className="ui large linkify icon"></i>;
    }

    onDismiss = () => {
        this.setState({showStreamLinkModal: false});
    }

    renderActions = () => (
        <React.Fragment>
            <button onClick={this.onDismiss} className="ui button">OK</button>
        </React.Fragment>
    );

    render()
    {
        if (!this.props.stream) 
            return <div>Loading ....</div>;
            
        return (
            <React.Fragment>
                {this.state.showStreamLinkModal && (
                        <Modal title="Live Stream Link" actions={this.renderActions()} onDismiss={this.onDismiss} >
                            <h4>Server: { `rtmp://localhost:8000/live/${this.props.match.params.id}` } </h4>
                            <h4>Stream Key: { `rtmp://localhost:8000/live/${this.props.match.params.id}` } </h4>
                        </Modal>
                    )
                }
                <div style={{display: 'flex', flexDirection: 'row'}}> 
                    <div style={{ padding: '15px', flexDirection: 'column', width: '70%'}}>

                        <video style={{width: '100%'}} ref={this.videoPlayerRef} controls />

                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <h2 style={{marginBottom: 0}} > { this.props.stream.title } </h2>
                            { this.renderStreamLinkIcon() }
                        </div>
                        <h4 style={{marginTop: 0}} > { this.props.stream.user.name } </h4>
                        <p> { this.props.stream.description } </p>

                    </div>
                    <div style={{width: '30%', padding: '15px'}} className="ui verticle menu" >
                        <Streams noShow={this.props.match.params.id} loc="side-menu" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return { stream: state.stream, currentUser: state.auth};
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);