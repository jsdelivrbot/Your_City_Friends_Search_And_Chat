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
                    <h1>Discover New Friends in Your City!</h1>
                </header>
                <div className="col-sm-offset-5 text-center">
                    <div className="btn-group">
                        <Link id="btnRegistration" className="btn btn-primary" to="/register">Join us</Link>
                        <Link id="btnLogin"className="btn btn-danger" to="/login">Login!</Link>
                    </div>
                </div>
                <Register />
                <footer>
                    <p>&copy; Pasquale Coretti</p>
                </footer>
            </div>
        )
    }
}
