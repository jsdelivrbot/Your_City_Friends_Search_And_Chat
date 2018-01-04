import _ from 'lodash'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getUserinfo, addPeopleFromSameCity} from '../actions/index'
import getSocket from '../socket_io'

class UserFromSameCity extends Component {

    componentDidMount() {
        const {getUserinfo, addPeopleFromSameCity} = this.props

        getUserinfo().then(() => {
            let city = _.map(this.props.user, usr => { return usr.city })
            city = city.toString()
            addPeopleFromSameCity({city})
        })
    }

    checkForCompleteInformation() {
        return _.map(this.props.user, user => {
            if(!user.city) {
                return (<div> <Link to="/userAddress">Please update your info</Link> </div>)
            }
        })
    }

    renderCity() {
        const city = _.map(this.props.user, user => {return user.city})

        return (
            <p>Users from: <strong><em>{city}</em></strong></p>
        )
    }

    renderUsers() {
        return _.map(this.props.usersFromSameCity, user => {
            if(!user.length) {
                return (
                    <div> No users in this city. Try again in a while</div>
                )
            } else {
                return user.map(usr => {
                    return (
                        <Link
                        to={`/chat/${usr.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        >
                            <li className="list-city-friends">
                                <div className="main-wrapper">
                                    <div className="img-wrapper">
                                        <img className="city-friend-img" src={usr.image}/>
                                    </div>
                                    <div className="text-wrapper">
                                        <p><em>Firstname:</em> {usr.firstname}</p>
                                        <p><em>Lastname:</em> {usr.lastname}</p>
                                        <p><em>Bio:</em> {usr.city}</p>
                                        <p><em>Age:</em> {usr.age}</p>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    );
                })
            }
        })
    }

    render() {
        return(
            <div className="chat-container">
                {this.checkForCompleteInformation()}
                {this.renderCity()}
                <ul>
                {this.renderUsers()}
                </ul>
            </div>
        )
    }
}

// here goes the notification alert!
function mapStateToProps(state){
    return {
        user: state.user,
        usersFromSameCity: state.usersFromSameCity
    }
}

export default connect(mapStateToProps, {getUserinfo, addPeopleFromSameCity})(UserFromSameCity)
