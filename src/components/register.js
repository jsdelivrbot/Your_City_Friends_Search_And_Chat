import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createNewUser } from '../actions/index'

class Register extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field
        return(
            <div>
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
        const { createNewUser, history } = this.props
        const {firstname, lastname, email, password, gender} = values
        console.log(values);
        createNewUser(firstname, lastname, email, password, gender, () => {
            location.replace('/')
        })
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                label="Firstname"
                name="firstname"
                type="text"
                component={this.renderField}
                />
                <Field
                label="Lastname"
                name="lastname"
                type="text"
                component={this.renderField}
                />
                <Field
                label="Email"
                name="email"
                type="email"
                component={this.renderField}
                />
                <Field
                label="Password"
                name="password"
                type="password"
                component={this.renderField}
                />
                <Field
                label="Gender"
                name="gender"
                type="text"
                placeholder="Male/Female"
                component={this.renderField}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    //console.log(values) => {title: '...', categories: '...', content: '...'}
    const errors = {};

    if (!values.firstname || values.firstname.length < 3) {
        errors.firstname = "Enter a title that is at least 3 characters!"
    }
    if (!values.age) {
        errors.age = 'Enter some categories please!'
    }
    if (!values.gender) {
        errors.gender = 'Enter some content please!'
    }
    if(values.gender !== 'Male' && values.gender !== 'male' && values.gender !== 'Female' && values.gender !== 'female') {
        errors.gender = "Please enter your gender as: 'Male/Female'"
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'RegisteNewUserForm'
})(
    connect(null, { createNewUser })(Register)
);
