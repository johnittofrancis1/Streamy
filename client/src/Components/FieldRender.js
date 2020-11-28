import React from 'react';

class FieldRender extends React.Component
{
    render()
    {
        const { input, label, type, required, meta: { touched, error } } = this.props;
        return (
            <div className={`field ${touched && (error && "error")}`}>
              <div>
                <input {...input} placeholder={label} type={type} required={required} />
              </div>
              {touched && ((error && error !== "required") && <div className="error-msg"> *{ error } </div>)}
            </div>
        );
    }
}

export default FieldRender;