import _ from 'lodash'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getUserinfo, addPeopleFromSameCity} from '../actions/index'
import getSocket from '../socket_io'

class UserFromSameCity extends Component {

    componentDidMount() {
        getSocket()
        const {getUserinfo, addPeopleFromSameCity} = this.props

        getUserinfo().then(() => {
            let city = _.map(this.props.user, usr => {
                return usr.city
            })
            city = city.toString()
            addPeopleFromSameCity({city: city})
        })
    }

    handleChatClick(recipientId) {
        console.log(recipientId);
        // getSocket().emit('chat', {recipientId})
        //socket io get into the game
    }

    renderUsers() {
        return _.map(this.props.usersFromSameCity, user => {
            console.log('userrr', user);
            return user.map(usr => {
                return (
                    <li>
                    <Link to={`/chat/${usr.id}`}>
                    <a onClick={e => this.handleChatClick(usr.id)}>Chat</a>
                    </Link>
                    <p>{usr.firstname}</p>
                    <p>{usr.lastname}</p>
                    <p>{usr.city}</p>
                    </li>
                );
            })
        })
    }

    render() {
        console.log('other users:', this.props.usersFromSameCity);
        // if(!this.props.user.city) {
        //     return (
        //         <div>Please, first update you city info</div>
        //     )
        // }

        return(
            <div>You here
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
