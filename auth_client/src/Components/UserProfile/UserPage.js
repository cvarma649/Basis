import React from 'react';
import "./UserPage.css";
import {useSelector,useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/User/user_actions";
import { useHistory } from 'react-router-dom';



function UserPage() {
    const dispatch = useDispatch();
    const {getUser,logOut}=bindActionCreators(actionCreators,dispatch)
    const state=useSelector((state)=>state.user_reducer)
    const firstName=state.user.firstName
    const phoneNumber=state.user.phoneNumber
    const email=state.email
    const user_id=state.user.user_id
    const history=useHistory();
    const reRouteTo=(p)=>history.push(p)


    const logout=()=>{
        logOut(user_id).then(reRouteTo("/"))
    }

    return (
        <div className="form_container">
            <h1>{`Hello ${firstName}!!`}</h1>
            <div className="form_control h2s">
                <h2>{`Your Contact Number is ${phoneNumber}.`}</h2>
                <h2>{`Your Email Id is ${email}.`}</h2>
                <div className="input_control">
                <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default UserPage
