import React, {Component} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'

class DesignedTrip extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentDidMount() {
        const {dispatch} = this.props
        console.log('designedTrip mounted');
    }
    render() {
        console.log('childer rendering', this.props.user);
        return (
            <div>Look for friends:

            </div>


        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(DesignedTrip)
