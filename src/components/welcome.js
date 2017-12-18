import React from 'react';
import Register from './register';
import { Link } from 'react-router'

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="loggedout-container welcome">
                <header>
                <h1>DESIGN YOUR ROAD TRIP BRO</h1>
                </header>
                {this.props.children}
                <footer>
                <p>&copy; Pasquale Coretti</p>
                </footer>
            </div>
        )
    }
}
