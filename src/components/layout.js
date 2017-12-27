import React from 'react'
import Header from './header'
import getSocket from '../socket_io'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
        getSocket()
    }

    render() {
    return (
      <div class="container">
        <Header />
        {this.props.children}
        <p>blabla</p>
      </div>
    );
    }
}
