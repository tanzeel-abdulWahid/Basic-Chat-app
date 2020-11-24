import React, { Component } from 'react'
import {connect} from 'react-redux';
import {get_users} from "../../store/action";
import firebase from 'firebase';


class Chat extends Component {

    constructor(){
        super()
        this.state = {
            chat_user : {},
            chats: [],
            message : ""
        }
    } 

    chat = (user) =>{
        this.setState({
            chat_user: user
        })
        let current_user = this.props.current_user;
        let merge_uid = this.uid_merge(current_user.uid, user.uid)
        this.get_messages(merge_uid)
    } 

    //Getting messages from DB and Pushing messages in chats array 
    get_messages = (uid) => {
        firebase.database().ref("/").child(`chats/${uid}`).on("child_added",(message)=>{
            this.state.chats.push(message.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }


    componentDidMount(){
        this.props.get_users()
    }

    uid_merge(uid1,uid2){
        if (uid1 < uid2){
            return uid1 + uid2
        }else{
            return uid2+uid1
        }
    }

    
    
    
    send_message = () =>{
        let chat_user = this.state.chat_user
        let current_user = this.props.current_user;
        let merge_uid = this.uid_merge(current_user.uid, chat_user.uid)
        
        //Send messages in DB
        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: current_user.name,
            uid: current_user.uid 
        })
        this.setState({
            message: ""
        })
    }

    render() {
        let user = this.props.current_user
        return (
            <div>
                <div>
                <h4>Welcome {user.name}</h4>
                <img src={user.profile} />
                <h6>Email : {user.email}</h6>
                </div>

                <div style={{display: "flex"}}>
                    <div style={{width: 300,background: "lightblue"}}>
                        <h1>All users</h1>
                        <ul>
                            {this.props.users.map((v, i)=>{
                                return v.uid !== user.uid && <li key={i}> <img src={v.profile}/>  {v.name} <button onClick={()=> this.chat(v)}>Chat</button> </li>
                            })}
                        </ul>
                    </div>
                    <div style={{width: 400 ,background: "lightpink"}}>
                        <h3>Chat</h3>
                        {Object.keys(this.state.chat_user).length ? 
                        <div>
                            <h4> <img src={this.state.chat_user.profile} /> {this.state.chat_user.name} </h4>

                            <ul>
                                {this.state.chats.map((v,i)=>{
                                    return <li style={{color: v.uid !== user.uid ? "blue" : "red" }} key={i}> {v.message} </li>
                                })}
                            </ul>

                            <input value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} type='text' placeholder='enter your message' />
                            <button onClick={()=>this.send_message()}>Send</button>
                        </div> :

                        <div>
                            <h4>No Chats</h4>  
                        </div>
                        }           
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
    get_users: ()=> dispatch(get_users())
})


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
