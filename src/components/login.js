import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logUserIn } from '../actions/index'


class Login extends Component {

    renderField(field) {
        const className = `form-group ${touched && error ? 'has-danger' : '' }`
        const { meta: { touched, error } } = field
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                className="form-control"
                placeholder={field.placeholder}
                type={field.type}
                {...field.input}
                />
                <div>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        const { logUserIn, history } = this.props
        const {email, password} = values
        console.log(values);
        logUserIn(email, password, () => {
            location.replace('/')
        })
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                placeholder="EMAIL ADDRESS"
                name="email"
                type="email"
                component={this.renderField}
                />
                <Field
                placeholder="PASSWORD"
                name="password"
                type="password"
                component={this.renderField}
                />
                <button
                className="btn btn-primary center-block"
                type="submit"
                >
                Submit
                </button>
            </form>
        );
    }
}

function validate(values) {

    const errors = {};

    if (!values.email) {
        errors.email = "Enter a valid email"
    }
    if (!values.password) {
        errors.password = 'Enter a valid password'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'logUserInForm'
})(
    connect(null, { logUserIn })(Login)
);
