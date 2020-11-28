import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';
import Streams from './Streams';
import StreamCreate from './StreamCreate';
import StreamEdit from './StreamEdit';
import StreamDelete from './StreamDelete';
import StreamShow from './StreamShow';
import Logout from './Logout';
import history from '../history';

class App extends React.Component
{
    render()
    {
        return (
            <div className="ui container">
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/streams" exact render={(props) => this.props.currentUser ? <Streams {...props} /> : <Redirect to="/" /> } />
                        <Route path="/streams/new" exact render={(props) => this.props.currentUser ? <StreamCreate {...props} /> : <Redirect to="/" /> } />
                        <Route path="/streams/edit/:id" exact render={(props) => this.props.currentUser ? <StreamEdit {...props} /> : <Redirect to="/" /> } />
                        <Route path="/streams/delete/:id" exact render={(props) => this.props.currentUser ? <StreamDelete {...props} /> : <Redirect to="/" /> } />
                        <Route path="/streams/:id" exact render={(props) => this.props.currentUser ? <StreamShow {...props} /> : <Redirect to="/" /> } />
                        <Route path="/logout" exact render={(props) => this.props.currentUser ? <Logout {...props} /> : <Redirect to="/" /> } />
                    </Switch>
                    </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.auth ? state.auth.email : null };
}

export default connect(mapStateToProps)(App);