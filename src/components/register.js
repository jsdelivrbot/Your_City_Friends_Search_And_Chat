import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createNewUser } from '../actions/index'

class Register extends Component {
    handleErrors() {
        return _.map(this.props.registration, error => {
            if(error.error === 23505) {
                return (
                    <div>This email has already been registered</div>
                );
            } else if (error.error === 1007) {
                return (
                    <div>Oops, an error occurred!</div>
                );
            }
        })
    }

    renderField(field) {
        const { meta: { touched, error } } = field
        const className = `form-container ${touched && error ? 'has-danger' : '' }`

        return(
            <div className={className}>
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
        const { createNewUser, history } = this.props
        const {firstname, lastname, email, password, gender} = values
        console.log(values);
        createNewUser(firstname, lastname, email, password, gender, () => {
            location.replace('/')
        })
    }

    render() {
        const { handleSubmit } = this.props
        console.log('renderrr', this.props.registration);
        return (
            <div className="welcome-container">
                {this.handleErrors()}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                    placeholder="FIRSTNAME"
                    name="firstname"
                    type="text"
                    component={this.renderField}
                    />
                    <Field
                    placeholder="LASTNAME"
                    name="lastname"
                    type="text"
                    component={this.renderField}
                    />
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
                    <Field
                    name="gender"
                    type="text"
                    placeholder="Male/Female"
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
                    to="/login">
                    Login
                    </Link>
                </form>

            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!values.firstname || values.firstname.length < 3) {
        errors.firstname = `Enter a Firstname that is at least 3 characters long!`
    }

    if (!values.lastname || values.lastname.length < 3) {
        errors.lastname = `Enter a Lastname that is at least 3 characters long!`
    }

    if (!values.email) {
        errors.email = `Don't forget to enter your email!`
    }

    if (!strongPassword.test(values.password)) {
        errors.password = `Your password needs to be at least 8 characters long and needs to have at least: 1  uppercase alphabetical character, one lowercase alphabetical character, one numeric character, one special character (?,@,#..)`
    }

    if(values.gender !== 'Male' && values.gender !== 'male' && values.gender !== 'Female' && values.gender !== 'female') {
        errors.gender = `Please enter your gender as: 'Male/Female'`
    }
    return errors;
}

function mapStateToProps(state){
    return {
        registration: state.registration
    }
}

export default reduxForm({
    validate,
    form: 'RegisteNewUserForm'
})(
    connect(mapStateToProps, { createNewUser })(Register)
);
