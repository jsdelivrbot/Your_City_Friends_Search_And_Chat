import React, {Component} from 'react';
import Register from './register';
import { Link } from 'react-router-dom'

export default class Welcome extends Component {
    render() {
        return(
            <div>
                <Register />
            </div>
        );
    }
}
