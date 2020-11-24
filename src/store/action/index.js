import firebase from 'firebase';
import {provider} from '../../config/firebase';

const facebook_login = (history) =>{
    return (dispatch) => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

            //getting user data
            let create_user = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid
            }
            //sending data to DB
            firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
            .then(()=>{
                dispatch({type: "SETUSER", payload: create_user})
                alert("login successfully")
                history.push("/chat")
            })

        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
        });
    }
}

const get_users = () =>{
    return(dispatch) => {
        
        //fetching users from DB and storing is list
        let users = []
        firebase.database().ref("/").child('users').on("child_added",(data)=>{
            users.push(data.val())
        })
        dispatch({type: "SET_FBUSERS", payload: users})
    }
}

export {
    facebook_login,
    get_users
}