import * as actionTypes from "./user_actionTypes.js";



export const postEmail=(email)=>{
    const body={email}
    return async(dispatch,getState) => {
        const res=await fetch("https://hiring.getbasis.co/candidate/users/email",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
        const parseRes = await res.json();
        if(parseRes.results){
        const isLogin=parseRes.results.isLogin
        const token=parseRes.results.token
        dispatch({
            type: actionTypes.POST_EMAIL,
            payload: {
                token:token,
                isLogin:isLogin,
                email:email
            }
        });
      
    }
    }
    
}


export const verifyEmailCode=(email,token,verificationCode)=>{
    
    const body={email,token,verificationCode};
    return async(dispatch,getState) => {
        const res=await fetch("https://hiring.getbasis.co/candidate/users/email/verify",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
        const parseRes = await res.json();
        //console.log(parseRes.success)
        const success=parseRes.success;
        const message=parseRes.message
        const results=parseRes.results
        //console.log(success,results,message)
        if(parseRes.success="true"){
            dispatch({
                    type:actionTypes.VERIFY_EMAIL_TOKEN,
                    payload:{
                         emailVerified:true,
                         isLogin:results.isLogin
                }})     
                try {
                    if(parseRes.results.isLogin="true"){  //Firing SIGN_UP DISPATCH IF ALREADY EXISTING USER IS VERIFIED
                        const user=results.user
                        const firstName=user.firstName
                        const phoneNumber=user.phoneNumber
                        const user_id=user._id
                        const user_token=user.token
        
                        localStorage.setItem("auth",`Bearer ${user_id,user_token}`)
                        localStorage.setItem("USER_ID",user_id)
                        localStorage.setItem("AUTH_TOKEN",user_token)
            
                        dispatch({
                            type:actionTypes.SIGN_UP,       
                                payload:{
                                   firstName: firstName,
                                   phoneNumber:phoneNumber,
                                   auth_token:user_token,
                                   user_id:user_id
                                }})           
                    }else{
                      
                          console.log("user must Sign up")           
                    } 
                } catch (error) {
                    console.error(error.message)
                }
                
                
        }
        else{
            dispatch({
                type:actionTypes.SET_FAILURE_MSG,
                payload:{
                    message:parseRes.message
                }
            })
        }} 
        }
    

export const refresh=()=>{
    return async(dispatch,getState) => {
        dispatch({
            type:actionTypes.REFRESH
        })
    }
}



export const signUp=(firstName,email,token,referredCodeKey,phoneNumber,agreeToPrivacyPolicy)=>{
    agreeToPrivacyPolicy=true;
    return async(dispatch,getState)=>{
        const body={firstName,email,token,referredCodeKey,phoneNumber,agreeToPrivacyPolicy};
        //console.log(JSON.stringify(body))
        const res=await fetch("https://hiring.getbasis.co/candidate/users",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        }) 
        const parseRes = await res.json();
       //console.log(parseRes);

       
        if(parseRes.message==="User signed up successfully."){ 

            const user=parseRes.results.user
            
            const user_id=user._id
            const user_token=user.token
            
            localStorage.setItem("auth",`Bearer ${user_id,user_token}`) //AS MENTIONED IN THE README
            localStorage.setItem("USER_ID",user_id) //FOR OTHER CONVENIENCE
            localStorage.setItem("AUTH_TOKEN",user_token) //FOR OTHER CONVENIENCE

            dispatch({
                type:actionTypes.SIGN_UP,
                    payload:{
                       firstName: firstName,
                       phoneNumber:phoneNumber,
                       auth_token:user_token,
                       user_id:user_id
                    }
            })           
        }else{
          
              console.log("user Not Signed In")           
        }      
    }
}





export const resendToken=(email,token)=>{
    return async(dispatch,getState)=>{
        const body={email,token}
        const res=await fetch("https://hiring.getbasis.co/candidate/users/token/resendtoken",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        }) 
        const parseRes = await res.json();
        //console.log(parseRes)
        dispatch({
            type:actionTypes.RESEND_TOKEN,
                    payload:{
                       message: parseRes.message
                    }
        })
    }
}


export const checkRef=(referredCodeKey)=>{
    return async(dispatch,getState)=>{

        const res=await fetch(`https://hiring.getbasis.co/candidate/users/referral/${referredCodeKey}`,{
            method:"GET"
        }) 
        const parseRes = await res.json();
        dispatch({
            type:actionTypes.CHECK_REF,
            payload:{
                message: parseRes.message
            }
        })
    
    }
}

export const getUser=(user_id,auth_token)=>{
    return async(dispatch,getState)=>{
        
        localStorage.setItem("auth",`Bearer ${user_id,auth_token}`)
       dispatch({
           type:actionTypes.GET_USER,
           payload:{
               user_id:user_id
           }
       })
    }

}

export const logOut=(user_id)=>{
    return async(dispatch,getState)=>{
        const res=await fetch(`https://hiring.getbasis.co/candidate/users/logout/${user_id}`,{
            method:"DELETE"
        }) 
        localStorage.clear()
        dispatch({
            type:actionTypes.LOG_OUT
        })
    }


}

export const getState=()=>{
    return async(dispatch,getState)=>{
        dispatch({
            type:actionTypes.GETSTATE
        })
    }
}
