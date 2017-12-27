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
        return _.map(this.props.allChats, chatMsgs => {
            return chatMsgs.map(chatMsg => {
                return (
                    <div className="chatlist-li">
                    <Link className="router-link" to={`/chat/${chatMsg.id}`}>
                    <p onClick={e => this.handleChatClick(chatMsg.id)}>{chatMsg.firstname} {chatMsg.lastname}</p>
                    </Link>
                    <p></p>
                    </div>
                );
            })
        })
    }

    render() {
        return(
            <div id="active-chat-bar" className="col-sm-3">
            <ul>{this.renderListOfChats()}</ul>
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
