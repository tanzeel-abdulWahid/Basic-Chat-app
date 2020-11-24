import React, { Component } from 'react';
import {connect} from "react-redux";
import {facebook_login} from "../../store/action"
import "./style.css"
class Home extends Component {
    render() {
        return (
            <div>
                <h1>home</h1>

                <button onClick={()=>this.props.facebook_login(this.props.history)}>Facebook Login</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    facebook_login: (history) => dispatch(facebook_login(history)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);
