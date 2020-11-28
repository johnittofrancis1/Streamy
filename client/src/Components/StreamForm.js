import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 

class StreamForm extends React.Component
{
    fieldRequired = value => value ? undefined : 'Required';

    renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <div className={`six wide field ${touched && (error && "error")}`}>
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} required={error === "Required"} />
          </div>
        </div>
    );

    render()
    {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(formValues => this.props.onSubmit(formValues))} className="ui form">
                <Field
                    name="title" 
                    label="Title"
                    component={this.renderField}
                    validate={[this.fieldRequired]} 
                />
                <Field
                    name="description" 
                    label="Description"
                    component={this.renderField}
                    validate={[this.fieldRequired]} 
                />
                <button className="ui submit button" type="submit">Submit</button>
            </form>
        );
    }
}


export default connect()(reduxForm({form: 'fieldLevelValidation'})(StreamForm));