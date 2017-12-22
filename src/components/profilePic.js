import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpdateProfilePic from './updateProfilePic'

class ProfilePic extends Component {
    constructor(props) {
        super(props)
        this.state={imageUploaderVisible: false}
    }

    toggleUploader() {
        this.setState({imageUploaderVisible: !this.state.imageUploaderVisible})
    }

    renderProfilePic() {
        return _.map(this.props.user, usr => {
            return (
                <img onClick={() => this.toggleUploader()} src={usr.image}/>
            );
        })
    }

    render() {
        const { imageUploaderVisible } = this.state
        return (
            <div>
    
            {this.renderProfilePic()}
            {imageUploaderVisible && <UpdateProfilePic />}
            </div>
        );
    }

}
function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ProfilePic)
