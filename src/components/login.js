import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logUserIn } from '../actions/index'


class Login extends Component {
    handleErrors() {
        return _.map(this.props.login, error => {

            if(error.error === 1003) {
                return (
                    <div>The Email or Password inserted is not correct!</div>
                )
            } else if(error.error === 1004) {
                return (
                    <div>You have inserted the wrong password too many time. Your account has been blocked for: {error.blocked} seconds!</div>
                )
            }
        })
    }

    renderField(field) {
        const { meta: { touched, error } } = field
        const className = `form-container ${touched && error ? 'has-danger' : '' }`

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

        logUserIn(email, password, () => {
            location.replace('/')
        })
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="welcome-container">
            {this.handleErrors()}
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
                className="welcome-button"
                type="submit"
                >
                Submit
                </button>
                <Link
                className="other-link"
                to="/">
                Join us
                </Link>

            </form>
            </div>
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

function mapStateToProps(state){
    return {
        login: state.login
    }
}

export default reduxForm({
    validate,
    form: 'logUserInForm'
})(
    connect(mapStateToProps, { logUserIn })(Login)
);
