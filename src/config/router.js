import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import  Home  from '../containers/Home';
import  Chat  from '../containers/Chat';

class AppRouter extends Component{
    render(){
        return(
            <Router>
                <Route exact path='/' component={Home} />
                <Route path='/chat' component={Chat} />
            </Router>
        )
    }
}

export default AppRouter