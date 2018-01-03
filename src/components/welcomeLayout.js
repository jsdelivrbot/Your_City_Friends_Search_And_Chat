import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'


export default class WelcomeLayout extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <div>
                <Header />
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}
