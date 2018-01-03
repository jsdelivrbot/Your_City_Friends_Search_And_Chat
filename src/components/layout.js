import React from 'react'
import Header from './header'
import Footer from './footer'
import getSocket from '../socket_io'

// export default class Layout extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state={}
//         getSocket()
//     }
//
//     render() {
//         return (
//             <div class="container">
//                 <Header />
//                 {this.props.children}
//                 <Footer />
//             </div>
//         );
//     }
// }

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
        getSocket()
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
