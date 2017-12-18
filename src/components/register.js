import React, {Component} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {registerNewUser} from '../actions'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    gender: 'male'
};

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    componentDidMount() {
        console.log('registration mounted');
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
        if(!this.props) {
            return null
            console.log('no props');
        }
        console.log('gender', this.state.gender);
        const {firstname, lastname, email, password, gender} = this.state
        const {dispatch} = this.props
        console.log('here');
        if(!firstname || !lastname || !email || !password) {
            this.setState({ error: true, err_msg: 'Please fill all the fileds!' })
            this.clearfields()
            // this.firstInput.focus()
        }  else {
            if(this.state.email.indexOf('@') == -1) {
                this.setState({ error: true, err_msg: 'Please enter a valid email!' })
                this.clearfields()
                this.firstInput.focus()
            } else {
                console.log('registering', gender);
                dispatch(registerNewUser(firstname, lastname, email, password, gender))

            }
        }
    }

    render() {
        return (
            <div className="register">
            <p>What's your name?</p>
            <input
            ref={(input) => {this.firstInput = input; }}
            name="firstname" type="text" placeholder="Name"
            value={this.state.firstname}
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <p>..and your Lastname?</p>
            <input
            name="lastname" type="text" placeholder="Lastname"
            value={this.state.lastname}
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <p>Wanna give us your email?</p>
            <input
            name="email" type="text" placeholder="Em@il"
            value={this.state.email}
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <p>Insert your Password</p>
            <input
            onKeyPress={this.activateButton}
            name="password" type="password" placeholder="Password"
            value={this.state.password}
            onChange={ (e) => this.handleChange(e.target.name, e.target.value) }
            />
            <br/>
            <select
            name="gender"
            value={this.state.value}
            onChange={(e) => this.handleChange(e.target.name, e.target.value)}>
                <option
                value="male"
                >
                Male
                </option>
                <option
                value="female"
                >
                Female
                </option>
            </select>
            <button
            class="registerButton"
            ref={(button) => {this.button = button; }}
            onClick={() => this.handleSubmit() }
            >Register
            </button>
            <p>..Already registered?</p>
            <br/>
            <Link to="/login"><p>Login</p></Link>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps)(Register)
