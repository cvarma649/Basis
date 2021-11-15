import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/User/user_actions";
import { useHistory } from 'react-router-dom';
import "./SignUp.css";


function SignUp(props) {
    const dispatch = useDispatch();
    const {signUp,checkRef,getUser,getState}=bindActionCreators(actionCreators,dispatch)
    const state=useSelector((state)=>state.user_reducer)
    const [phoneNum,setPhoneNum]=useState("");
    const [firstName,setFirstName]=useState("");
    const [refCode,setrefCode]=useState("");
    const [agreeToPrivacyPolicy, setagreeToPrivacyPolicy] = useState(false);

    const history=useHistory();
    const reRouteTo=(p)=>history.push(p);
    const [message,setMessage]=useState("")
    const email=state.email;
        const token=state.token
        const stringToken=token.toString()


    const signup=async(e)=>{ 
        const phoneNumber=phoneNum.toString()
        e.preventDefault();
        if(firstName,email,token,refCode,phoneNumber,agreeToPrivacyPolicy){
            signUp(firstName,email,token,refCode,phoneNumber,agreeToPrivacyPolicy,()=>{
                console.log("signedUp")
            })
             }  else{
                setMessage("Type Something")
            }
            
    }

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
    }
   
  }

    const checkRefCode=()=>{
        if(!refCode.length===6 || !refCode.match(/^([0-9]|[a-z])+([0-9a-z]+)$/i)){
            setMessage(`You cannot sign up with an invalid referredCodeKey value!
            referredCodeKey is an alphanumeric string of length 6.`)
           
        }else{
        
            checkRef(refCode).then(res=>{
                setMessage(state.failureMessage)
        })} 
    }
        
    useEffect(()=>{
        if(checkRef.length>6){
            checkRefCode();}
        },
        [])
   
        useEffect(()=>{      
                getUserProfile();
        },[state.user])

    return (
        <div className="form_container">

            <h2>Please Type the token sent on your email Id</h2>
            <form className="form_control" onSubmit={signup}>

                <div className="input_control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email}/>
                </div>

                <div className="input_control">
                <label htmlFor="token">Token</label>
                <input id="token" type="text" value={stringToken} />
                </div>

                <div className="input_control">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                </div>

                <div className="input_control">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber" type="text" value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
                </div>
                <div className="input_control">
                <label htmlFor="refCode">refferedCodeKey</label>
                <input id="refCode" type="text" value={refCode} onChange={(e)=>setrefCode(e.target.value)}/>
                </div>
                <span className="input_control pp">
                    <label htmlFor="pp">
                       
                        Accept PrivacyPolicy
                    </label> <input id="pp" type="checkbox" defaultValue={agreeToPrivacyPolicy} onChange={e=>setagreeToPrivacyPolicy(!agreeToPrivacyPolicy)} />
                    </span>
                <div className="input_control btns">
                <button type="submit" className="signup_button">Sign Up</button>
                </div>
               {message?message:""}
            </form>
        </div>
    )
}

export default SignUp;
