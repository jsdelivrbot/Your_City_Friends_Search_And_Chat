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
            let city = _.map(this.props.user, usr => {
                return usr.city
            })
            city = city.toString()
            addPeopleFromSameCity({city: city})
        })
    }

    checkForCompleteInformation() {
        return _.map(this.props.user, user => {
            if(!user.city) {
                return (<div>Please update your info <Link to="/userAddress"></Link> </div>)
            }
        })
    }

    handleChatClick(recipientId) {
        console.log(recipientId);
    }

    renderUsers() {
        return _.map(this.props.usersFromSameCity, user => {
            console.log('userrr', user);
            if(!user.length) {
                return (
                    <div> No users in this city. Try again in a while</div>
                )
            } else {
                return user.map(usr => {
                    return (
                        <li>
                        <Link to={`/chat/${usr.id}`}>
                        <a>Chat</a>
                        </Link>
                        <p>{usr.firstname}</p>
                        <p>{usr.lastname}</p>
                        <p>{usr.city}</p>
                        </li>
                    );
                })
            }
        })
    }

    render() {
        console.log('other users:', this.props.usersFromSameCity);
        console.log('user', this.props.user);
        // if(!this.props.user.city) {
        //     return (
        //         <div>Please, first update you city info</div>
        //     )
        // }

        return(
            <div>
                {this.checkForCompleteInformation()}
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
