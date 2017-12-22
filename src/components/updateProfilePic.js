import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { uploadPic, getUserinfo } from '../actions/index'


class UpdateProfilePic extends Component {

    renderField(field) {
        console.log(field);
        // const props = this.props.fields[field.name];
        const { meta: { touched, error } } = field
        const { input: {onDrop, onChange, onFocus, onUpdate} } = field
        return(
            <div>
                <label>{field.label}</label>
                <input
                type="file"
                onDrop={onDrop}
                onChange={onChange}
                onFocus={onFocus}
                onUpdate={onUpdate}
                />
                <div>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(file) {
        var formData = new FormData();
        const { image } = file
        formData.append('file', image[0])
        uploadPic(formData, () =>{
            this.props.getUserinfo()
        })

    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                label="Picture"
                name="image"
                component={this.renderField}
                />
                <button type="submit">Upload</button>
            </form>
        );
    }
}

function validate(values) {

    const errors = {};

    if (!values.image) {
        errors.email = "No valid image updated"
    }

    return errors;
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default reduxForm({
    validate,
    form: 'uploadeImage'
})(
    connect(mapStateToProps, { uploadPic, getUserinfo })(UpdateProfilePic)
);
