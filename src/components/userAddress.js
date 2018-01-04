import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Autocomplete from 'react-google-autocomplete'
import { updateUserInfo } from '../actions/index'

class userAddress extends Component {
    constructor(props) {
            super(props)
            this.state = {};
    }

    handleChange(name, value) {
        this.setState({
            [name] : value
        });
    }

    getLocation(lat, lng, city) {
        this.setState({lat: lat, lng: lng, city: city})
    }

    handleSubmit() {
        const {updateUserInfo} = this.props
        const {age, bio, lat, lng, city} = this.state

        if(age || bio || lat || lng || city) {
           updateUserInfo(age, bio, lat, lng, city, () => {
               this.props.history.push('/')
           })
        }
    }

     render() {
         return (
            <div className="form-personal-info">
            <div className="form-container">
            <p>Your age:</p>
            <input
            className="form-control"
            ref={(input) => {this.firstInput = input; }}
            name="age"
            type="number"
            placeholder="Your Age"
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <p>where do you leave?</p>
            <Autocomplete
            className="form-control"
            placeholder="Your City Name"
            onPlaceSelected={(place) => {
               var lat = place.geometry.location.lat()
               var lng = place.geometry.location.lng()
               var city = place.address_components[0].long_name
               this.getLocation(lat, lng, city)
            }}
            />
            <p>Say something about yourself:</p>
            <input
            className="form-control"
            type="text"
            name="bio"
            placeholder="Your Biography"
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <button
            type="submit"
            onClick={() => this.handleSubmit() }
            >
            Submit
            </button>
            </div>
            </div>
        )
     }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateUserInfo }, dispatch)
}

export default connect(null, mapDispatchToProps)(userAddress)
