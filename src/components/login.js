import React, {Component} from 'react';
import Axios from '../axios'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {verifyCredential} from '../actions'

const initialState = {
    email: '',
    password: ''
};

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    componentDidMount() {
        console.log('Login mounted');
    }

    clearfields() {
        this.state = initialState
        this.setState(initialState);
    }

    handleChange(name, value) {
        this.setState({
            [name] : value
        });
    }

    handleSubmit() {
        const {email, password} = this.state
        const {dispatch} = this.props

        if(!email || !password) {
            this.setState({ error: true, err_msg: 'Please fill all the fileds!' })
            this.clearfields();
            this.firstInput.focus();
        } else if (email.indexOf('@') == -1) {
            this.setState({ error: true, err_msg: 'Email needs to have "@"!' })
            this.clearfields();
            this.firstInput.focus();
        } else {
            dispatch(verifyCredential(email, password))
        }
    }

    render() {
        return(
            <div className="login">
            <p>Email</p>
            <input
            ref={(input) => {this.firstInput = input}}
            name="email"
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e.target.name, e.target.value) }
            />
            <p>Password</p>
            <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e.target.name, e.target.value) }
            />
            <br/>
            <button
            ref={(button) => { this.button = button; }}
            onClick={() => this.handleSubmit() }>
            >
            Log In!
            </button>
            <p>Not registered yet?</p>
            <br/>
            <Link to="/"><p>Register</p></Link>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps)(Login)
