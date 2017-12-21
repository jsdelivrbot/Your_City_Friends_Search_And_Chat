import React, {Component} from 'react';
import Register from './register';
import { Link } from 'react-router-dom'

export default class Welcome extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return(
            <div className="loggedout-container welcome">
                <header>
                <h1>DESIGN YOUR ROAD TRIP BRO</h1>
                </header>
                <Link to="/login">Login</Link>
                <Register />
                <footer>
                <p>&copy; Pasquale Coretti</p>
                </footer>
            </div>
        )
    }
}
