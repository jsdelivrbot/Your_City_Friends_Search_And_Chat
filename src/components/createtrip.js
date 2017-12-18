import React, {Component} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Autocomplete from 'react-google-autocomplete'
import ReactDOM from 'react-dom';
import {uploadImagePicture, updateUserInfo} from '../actions'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Axios from '../axios'



class CreateTrip extends Component {
    constructor(props) {
        super(props)
        this.state = { imageUploaderVisible: false };
    }

    handleChange(name, value) {
        this.setState({
            [name] : value
        });
        console.log('handleChange',this.state);
    }
    handleImgChange(name, file){
        this.setState({
            [name] : file
        });
    }

    getLocation(lat, lng, city) {
        this.setState({lat: lat, lng: lng, city: city})
    }

    toggleUploader() {
        const {imageUploaderVisible} = this.state
        this.setState({imageUploaderVisible: !imageUploaderVisible})
    }

    handleSubmit() {
        var formData = new FormData();
        const {dispatch} = this.props
        const {file, age, bio, lat, lng, city} = this.state
        if(file && file.size < 2597152) {
            formData.append('file', file);
            console.log('before dispatching:', formData);
            dispatch(uploadImagePicture(formData))
        }
        if(age || bio || lat || lng || city) {
            console.log('submit all that are there:', file, age, bio, lat, lng, city);
            dispatch(updateUserInfo(age, bio, lat, lng, city))
        }

    }

    render() {
        console.log('childer rendering####', this.props.user);
        const uploadPicture = () => {

            return (
                <div className='modal-upload-container'>
                    <a className="close-window-utility" onClick={() => this.props.toggleUploader()}>X</a>
                    <p>Why don't you upload a pic ?</p>
                    <input
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                    onChange={ (e) => this.handleImgChange(e.target.name, e.target.files[0]) }
                    onKeyPress={this.activateButton}
                    />
                    <label htmlFor="file">Choose a file</label>
                    <button
                    ref={(button) => {this.button = button}}
                    type="submit"
                    onClick={() => this.handleSubmit() }
                    >
                    </button>
                    {this.state.loading && <Loading />}
                    {this.state.error && <p>{this.state.err_msg}</p>}
                </div>
            )
        }

        return (
            <div>here you are
            <img onClick={() => this.toggleUploader()}  src={this.props.user.image}/>
            {this.state.imageUploaderVisible && uploadPicture()}
            Your age:
            <input
            ref={(input) => {this.firstInput = input; }}
            name="age" type="number" placeholder="Name"
            value={this.state.firstname}
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <p>where do you leave?</p>
            <Autocomplete
            style={{width: '50%'}}
            onPlaceSelected={(place) => {
                var lat = place.geometry.location.lat()
                var lng = place.geometry.location.lng()
                var city = place.address_components[0].long_name
                // this.setState({mapneed: true, lat: lat, lng: lng})
                // console.log(this.state.mapneed);
                this.getLocation(lat, lng, city)
            }}
            />
            <input
            type="text"
            name="bio"
            value={this.state.bio}
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <button
            type="submit"
            onClick={() => this.handleSubmit() }
            >
            </button>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CreateTrip)
