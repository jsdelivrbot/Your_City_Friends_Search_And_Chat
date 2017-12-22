<<<<<<< HEAD
import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
=======
import _ from 'lodash'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
>>>>>>> 7b34298a55b28646339fcc35e13894aac8166435
import {store} from '../start'
// import {getUserinfo, displayInfoWheather} from '../actions'
import {getUserinfo} from '../actions/index'
import axios from 'axios'
import ProfilePic from './profilePic'
import getSocket from '../socket_io'
// import {geolocated} from 'react-geolocated';

class App extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {};
    // }
    constructor(props) {
        super(props)
        this.state = {}
        getSocket()
    }

    componentDidMount() {
        this.props.getUserinfo().then(() => {
            console.log('user did mount:', this.props.user);
        })
        console.log(this.props.isGeolocationAvailable)

    }

    getWeather() {
        const { user: {lat, lng} } = this.props
        // this.props.displayInfoWheather(lat, lng)
    }
    renderUser(){
        return _.map(this.props.user, usr => {
            return (
                <div>
                <ProfilePic />
                <p>{usr.firstname}</p>
                </div>
            );
        })
    }
    render() {

        if(!this.props.user) {
            return (<div>Loading</div>)
        }

        const {user, wheather, dispatch} = this.props
            console.log('userrrrr', user);
        console.log('wheather', wheather);
        // {user.lat && user.lng && displayWheather()}
        // const displayWheather = () => {
        //     setInterval(
        //         () => dispatch(displayInfoWheather(user.lat, user.lng)),
        //         10000
        //     );
        // }





        return(
            <div>
                <Link to="/userFromSameCity">Find friend from your same city!</Link>
                <Link to="/userAddress">Update your information</Link>
                {this.state.whether && <p>clear wheather today! perfect time to go out!</p>}
                <p>hello {this.props.user.firstname}!</p>
                {this.renderUser()}
                {this.getWeather()}
                <p></p>

            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        getUserinfo: () => dispatch(getUserinfo())
    };
};

const mapStateToProps = function(state) {
    return {
        user: state.user,
        wheather: state.wheather
    };
};

// function mapStateToProps(state){
//     return {
//         user: state.user,
//         wheather: state.wheather
//     }
// }

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(App)
=======
export default connect(mapStateToProps, { getUserinfo })(App)
>>>>>>> 7b34298a55b28646339fcc35e13894aac8166435
