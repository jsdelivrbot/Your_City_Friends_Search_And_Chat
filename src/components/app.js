import React, {Component} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {store} from '../start'
import {getUserinfo, displayInfoWheather} from '../actions'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentDidMount() {
        const {dispatch, user} = this.props
        console.log(this.props.user);
        dispatch(getUserinfo())

    }

    render() {
        if(!this.props.user) {
            return null
        }
        const {user, wheather, dispatch} = this.props
        console.log('wheather', wheather);
        // {user.lat && user.lng && displayWheather()}
        // const displayWheather = () => {
        //     setInterval(
        //         () => dispatch(displayInfoWheather(user.lat, user.lng)),
        //         10000
        //     );
        // }


        const children = React.cloneElement(this.props.children, {});


        return(
            <div>
                <Link to='/createTrip'>Create your trip</Link>
                {this.state.whether && <p>clear wheather today! perfect time to go out!</p>}
                <p>hello {user.firstname}!</p>

                <p></p>
                {children}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        wheather: state.wheather
    }
}

export default connect(mapStateToProps)(App)
