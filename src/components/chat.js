import _ from 'lodash'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {store} from '../start'
import getSocket from '../socket_io'
// implement the timestamp!
class PrivateChat extends Component {
    componentDidMount() {
        getSocket()
        const {id: recipientId} = this.props.match.params

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
        console.log(recipientId);

        newPrivateMsg && getSocket().emit('newChatMsg', {newPrivateMsg, recipientId})
        this.newPrivateMsg.value = ''
    }

    renderPreviousChat() {
        console.log(this.props.chat);
        const {id} = this.props.match.params
            return this.props.chat[id].map(privMessage => {
                let style
                if(!privMessage.newMessage) {
                    style = 'private_chat_sender'
                } else {
                    style = 'private_chat_receiver'
                }
                return (
                    <div>
                    <p>yoy</p>
                    <li className={style}><p>{privMessage.message}</p></li>
                    </div>
                )
            })
    }

    render() {
        const {id} = this.props.match.params

        if(!this.props.chat || !this.props.chat[id]) {
            return null
        }

        return(
            <div className="priv-chat">
            {this.renderPreviousChat()}
            <textarea
            placeholder="type here your message"
            ref={newPrivateMsg=>this.newPrivateMsg=newPrivateMsg}
            onChange={event => this.handleChange(event)}
            />
            <button onClick={event => this.submitMsg(event)}
            >Send
            </button>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        chat: state.chat
    }
}

export default connect(mapStateToProps)(PrivateChat)
