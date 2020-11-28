import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { logIn, closeLogin } from '../actions/auth';
import FieldRender from './FieldRender';
import Modal from './Modal';

class Login extends React.Component
{
    onSubmit = (credentials) => {
        this.props.logIn(credentials);
    }

    onDismiss = () => {
        this.props.closeLogin();
    }

    renderActions = () => (
        <React.Fragment>
            <button form="login" type="submit" className="ui button primary">Login</button>
            <button onClick={this.onDismiss} className="ui button">Cancel</button>
        </React.Fragment>
    );

    render()
    {
        const {handleSubmit} = this.props;
        return (
            <Modal title="LogIn" actions={this.renderActions()} onDismiss={() => this.onDismiss()}>
                {this.props.errorMsg && <div className="error-msg"> *{ this.props.errorMsg } </div>}
                <form id="login" onSubmit={handleSubmit(this.onSubmit)} className="ui form" >
                    <Field
                        name="email" 
                        label="Email Id"
                        required
                        component={FieldRender}
                    />
                    <Field
                        type="password"
                        name="password" 
                        label="Password"
                        required
                        component={FieldRender}
                    />
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {errorMsg: state.errorMsg};
}

const validate = values => {
    const errors = {}
    if (!values.email)
        errors.email = "required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) 
        errors.email = 'Invalid email address';
    if(!values.password)
        errors.password1 = "required";
    return errors
}

export default connect(mapStateToProps, { logIn, closeLogin })(reduxForm({form: 'login', validate})(Login));