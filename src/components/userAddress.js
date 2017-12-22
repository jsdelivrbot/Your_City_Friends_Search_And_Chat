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
        console.log('handleChange',this.state);
    }

    getLocation(lat, lng, city) {
        this.setState({lat: lat, lng: lng, city: city})
        console.log(lat, lng, city);
    }

    handleSubmit() {
        const {updateUserInfo} = this.props
        const {file, age, bio, lat, lng, city} = this.state

        if(age || bio || lat || lng || city) {
           console.log('submit all that are there:', file, age, bio, lat, lng, city);
           updateUserInfo(age, bio, lat, lng, city, () => {
               this.props.history.push('/')
           })
        }
    }

     render() {
         console.log();
         return (
           <div>here you are
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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateUserInfo }, dispatch)
}

export default connect(null, mapDispatchToProps)(userAddress)
