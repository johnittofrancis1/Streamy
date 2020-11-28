import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 

import Login from './Login';
import FieldRender from './FieldRender';
import { signUp } from '../actions/auth';

class Home extends React.Component
{
    onSubmit = (formValues) => {
        const credentials = {name: formValues.name, email: formValues.email, password: formValues.password1};
        this.props.signUp(credentials);
    }

    render()
    {
        const { handleSubmit, submitting } = this.props;
        return (
            <React.Fragment>
                {this.props.loginOpen && <Login />}
                <div className="ui six column stackable grid container">
                    <div className="row">
                        <div style={{padding: 0}} className="twelve wide column">
                            <img className="ui fluid image" src={require("../CMS.png")} alt="Home_Image" />
                        </div>
                        <div style={{backgroundColor: 'orange', display: 'flex', justifyContent: 'center', flexDirection: 'column'}} className="four wide column">
                            <h2 className="ui primary-color header center aligned">Create an Account</h2>
                            <form onSubmit={handleSubmit(formValues => this.onSubmit(formValues))} className="ui form" style={{display: 'flex', flexDirection: 'column'}}>
                                <Field
                                    type="text"
                                    name="name" 
                                    label="Name"
                                    required
                                    component={FieldRender}
                                />
                                <Field
                                    type="email"
                                    name="email" 
                                    label="Email Id"
                                    required
                                    component={FieldRender}
                                />
                                <Field
                                    type="password"
                                    name="password1" 
                                    label="Password"
                                    required
                                    component={FieldRender}
                                />
                                <Field
                                    type="password"
                                    name="password2" 
                                    label="Confirm Password"
                                    required
                                    component={FieldRender}
                                />
                                <button className="ui submit button primary" type="submit" disabled={submitting}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {loginOpen: state.loginOpen};
}

const validate = values => {
    const errors = {}
    if (!values.name)
        errors.name = "required";
    if (!values.email)
        errors.email = "required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) 
        errors.email = 'Invalid email address';
    if(!values.password1)
        errors.password1 = "required";
    if(!values.password2)
        errors.password2 = "required";
    else if (values.password1 !== values.password2)
    {
        errors.password1 = "required";
        errors.password2 = "Password does not match";
    }
    return errors
}

export default connect(mapStateToProps, { signUp })(reduxForm({form: 'signup',
                                                                validate,
                                                                })(Home));