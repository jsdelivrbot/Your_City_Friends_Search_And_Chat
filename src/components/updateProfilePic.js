import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { uploadPic, getUserinfo } from '../actions/index'


class UpdateProfilePic extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field
        const { input: {onDrop, onChange, onFocus, onUpdate} } = field

        return(
            <div>
                <label>{field.label}</label>
                <input
                className="inputfile"
                type="file"
                id="file"
                onDrop={onDrop}
                onChange={onChange}
                onFocus={onFocus}
                onUpdate={onUpdate}
                />
                <label htmlFor="file">Choose a file</label>
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
        uploadPic(formData, () => {
            this.props.getUserinfo()
            this.props.toggleUploader()
        })

    }

    render() {
        const { handleSubmit } = this.props

        return (
            <div className="uploader-container">
                <a className="close-window-utility" onClick={() => this.props.toggleUploader()}>X</a>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                    label="Upload a picture:"
                    name="image"
                    component={this.renderField}
                    />
                    <button type="submit">Upload</button>
                </form>
            </div>
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
