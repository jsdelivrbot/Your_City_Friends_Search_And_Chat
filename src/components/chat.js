import _ from 'lodash'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {store} from '../start'
import getSocket from '../socket_io'
import ActiveChatList from './activeChatList'
import moment from 'moment'

// implement the timestamp!
class PrivateChat extends Component {

    componentDidMount() {
        const {id: recipientId} = this.props.match.params

        getSocket().emit('allChatMsgs')
        if(!store.getState().prevChatMsgs) {
            getSocket().emit('chat', {recipientId})
        }
    }

    handleChange(event){
        this.setState({newPrivateMsg: event.target.value})
    }

    submitMsg(event){
        const {newPrivateMsg} = this.state
        const {id: recipientId} = this.props.match.params

        function addChatToList() {
            getSocket().emit('allChatMsgs')
        }

        newPrivateMsg && getSocket().emit('newChatMsg', {newPrivateMsg, recipientId})

        setTimeout(addChatToList, 400)

        this.newPrivateMsg.value = ''
    }

    renderPreviousChat() {

        const {id} = this.props.match.params
            return this.props.chat[id].map(privMessage => {
                let style
                if(!privMessage.newMessage) {
                    style = 'private_chat_receiver'
                } else {
                    style = 'private_chat_sender'
                }
                return (
                    <li className={style}>
                    <h4>{privMessage.message}</h4>
                    <h6>{moment(privMessage.time).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                    </li>
                )
            })
    }

    render() {
        const {id} = this.props.match.params
        if(!this.props.chat || !this.props.chat[id]) {
            return null
        }
        return(
            //try with: row and col
            <div  className="row">
                <ActiveChatList />
                <div className="col-sm-6">
                    <ul>{this.renderPreviousChat()}</ul>
                </div>
                 <div className="row force-to-bottom text-center">
                    <textarea
                    className="form-control"
                    placeholder="type here your message"
                    ref={newPrivateMsg=>this.newPrivateMsg=newPrivateMsg}
                    onChange={event => this.handleChange(event)}
                    />
                    <button
                    className="btn btn-primary"
                    id="chat-btn"
                    onClick={event => this.submitMsg(event)}
                    >
                    Send
                    </button>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        chat: state.chat,
        allChats: state.allChats
    }
}

export default connect(mapStateToProps)(PrivateChat)
