import React,{useState,useEffect} from 'react';
import "./LoginPage.css";
import {useSelector,useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/User/user_actions";
import { useHistory } from 'react-router-dom';

function LoginPage() {
    const dispatch = useDispatch();
    const {postEmail,verifyEmailCode,refresh}=bindActionCreators(actionCreators,dispatch)
    const state=useSelector((state)=>state)
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");

    const path="/verifyCode";
    let history = useHistory();
    const reRoute=()=>{
        history.push(path);
    }

    const verifyEmail=async(e)=>{ 
       
        e.preventDefault();
        if(email.length>0){
       postEmail(email).then(
        res=>console.log({state})
       );
       if(state){
           reRoute("/verifyCode");
       } 
       
       }else{
           setMessage("Type Something")
       }
    }


    useEffect(()=>refresh(),[])

    return (
        <div>
        <div className="form_container">
            <h1>Hello There!
                <br/>
                 LogIn to View your Profile!</h1>
            <form className="form_control" action="/verifyCode" onSubmit={verifyEmail} >
            <div className="input_control">
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>  
                <br/>
                <button type="submit" >Send Verification Code</button>
                </div>
            </form>
            <p>{message?message:""}</p>
        </div>
        </div>
    )
}



export default (LoginPage)
