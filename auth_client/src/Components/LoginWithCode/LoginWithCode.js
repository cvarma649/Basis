import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/User/user_actions";
import { useHistory } from 'react-router-dom';
import "./LoginWithCode.css"

function LoginWithCode() {
    const dispatch = useDispatch();
    const {verifyEmailCode,resendToken,getUser}=bindActionCreators(actionCreators,dispatch)
    const state=useSelector((state)=>state.user_reducer)
    const [verificationCode,setverificationCode]=useState("");
    const [message,setMessage]=useState("");
    const history=useHistory();
    const reRouteTo=(p)=>history.push(p)
    const isLogin=state.isLogin
    const [auth,setAuth]=useState(false)



    const resendEmail=async(e)=>{
      const email=state.email;
      const token=state.token
      const stringToken=token.toString()
      e.preventDefault()
    resendToken(email,stringToken).then(res=>{
      const g=state.failureMessage
      setMessage(g)
    })
    
    }

        const verifyCode=async(e)=>{ 
            e.preventDefault();
            if(verificationCode.length>0){
           verifyEmailCode(state.email,state.token,verificationCode).then(
             res=>{
               if(isLogin=="true"){
                 getUserProfile();
               }else{
                 reRouteTo("/signup")
               }
        })}}
    
        const getUserProfile=()=>{
          const user_id=localStorage.getItem("USER_ID")
          const user_token=localStorage.getItem("AUTH_TOKEN")
          if(user_token){
              getUser(user_id,user_token).then(resp=>{
                  reRouteTo(`/user/${user_id}`)
                  console.log(state)
              })
          }else{
              console.log("done")
          }}
        

        useEffect(()=>{  
        getUserProfile()
      },[state.isLogin])

      

        useEffect(()=>{
          setMessage(state.failureMessage)
        },[state.failureMessage])

    return (
        <div>
             <div className="form_container">
            <h1>Please Provide the Verification Code Sent on your Email Address</h1>
            <form className="form_control" onSubmit={verifyCode} >
              <div className="input_control">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={state.email}/>
              </div>
              <div className="input_control">
                <label htmlFor="token">Token</label>
                <input id="token" type="text" value={state.token} />
              </div>
                <br/>
                <div className="input_control">
                <label htmlFor="token">Verification Code</label>
                <input type="text" value={verificationCode} onChange={(e)=>setverificationCode(e.target.value)}/>
              </div>
              <br/>
              
              <div className="input_control btns">
              <button className="submit" type="submit">Verify Email</button>
                <button className="resendBtn" type="button" onClick={resendEmail}>Resend Token</button>
                </div>
            </form>
            <p>{message?message:""}</p>
        </div>
        </div>
    )
}

export default LoginWithCode
