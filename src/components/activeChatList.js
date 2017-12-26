import _ from 'lodash'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import getSocket from '../socket_io'

class ActiveChatList extends Component {

    handleChatClick(recipientId) {
        console.log(recipientId);
        getSocket().emit('chat', {recipientId})
    }

    renderListOfChats() {
        console.log('renderiamo Nel Nuovo Component', this.props.allChats);
        return _.map(this.props.allChats, chatMsgs => {
            console.log('singlechat',chatMsgs)
            return chatMsgs.map(chatMsg => {
                return (
                    <div>
                    <Link to={`/chat/${chatMsg.id}`}>
                    <a onClick={e => this.handleChatClick(chatMsg.id)}>{chatMsg.firstname} {chatMsg.lastname}</a>
                    </Link>
                    <p></p>
                    </div>
                );
            })
        })
    }

    render() {
        return(
            <div>
            <p>#########</p>
            {this.renderListOfChats()}
            <p>########</p>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        allChats: state.allChats
    }
}

export default connect(mapStateToProps)(ActiveChatList)
