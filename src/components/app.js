import _ from 'lodash'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {store} from '../start'
import {getUserinfo} from '../actions/index'
import ProfilePic from './profilePic'
import getSocket from '../socket_io'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.getUserinfo()
    }

    getWeather() {
        const { user: {lat, lng} } = this.props
    }
    renderUser(){
        return _.map(this.props.user, usr => {
            return (
                <div>
                <p>Hello, {usr.firstname}</p>
                <ProfilePic />
                <p>{usr.bio}</p>
                </div>
            );
        })
    }
    render() {

        if(!this.props.user) {
            return (<div>Loading</div>)
        }

        const {user, wheather, dispatch} = this.props
        console.log('wheather', wheather);
        // {user.lat && user.lng && displayWheather()}
        // const displayWheather = () => {
        //     setInterval(
        //         () => dispatch(displayInfoWheather(user.lat, user.lng)),
        //         10000
        //     );
        // }
        console.log('child', this.props.children);


        return(
            <div className="container">
                {this.renderUser()}
                {this.getWeather()}
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


export default connect(mapStateToProps, { getUserinfo })(App)
