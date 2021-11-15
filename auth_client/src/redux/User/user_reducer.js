import * as actionTypes from "./user_actionTypes.js";

const INITIAL_STATE={
    user:{
        firstName:"",
        phoneNumber:"", 
      
        user_id:""
    },
    email:"",
    isLogin:false,
    token:"",
    emailVerified:false,
    isAuthenticated:false,
    failureMessage:"",
    loading:false,
    auth_token:""

}

const user_reducer=(state=INITIAL_STATE,action)=>{
    if(action.type===actionTypes.POST_EMAIL){
       return{
        ...state,
       token:action.payload.token,
       isLogin:action.payload.isLogin,
       email:action.payload.email,
       newUser:{...state.isLogin="true"?false:true}
       }}
    if(action.type===actionTypes.VERIFY_EMAIL_TOKEN){
        return{
            ...state,
            emailVerified:action.payload.emailVerified,
            isLogin:action.payload.isLogin
        }
    }if(action.type===actionTypes.LOG_IN){
        return{
            ...state,
            isAuthenticated:state.isLogin==="true" && state.emailVerified==="true" ? true:false,
            user:{
                ...state.user,user_id:action.payload.user_id
            }, auth_token:action.payload.user_token
        }
    }if(action.type===actionTypes.SIGN_UP){
  
        return{
            
            ...state,
            isLogin:true,
            user:{
                ...state.user,firstName:action.payload.firstName,phoneNumber:action.payload.phoneNumber,user_id:action.payload.user_id
            },auth_token:action.payload.auth_token,
           
            
        }
    }if(action.type===actionTypes.SET_FAILURE_MSG){
       return{
           ...state,
           failureMessage:action.payload.message,
           loading:true
       }
    }if(action.type===actionTypes.REFRESH){
        return{
            ...state,
            emailVerified:INITIAL_STATE.emailVerified,
            isAuthenticated:INITIAL_STATE.isAuthenticated,
            email:INITIAL_STATE.email,
            user:INITIAL_STATE.user,
            isLogin:INITIAL_STATE.isLogin,
            token:INITIAL_STATE.token,
            auth_token:INITIAL_STATE.auth_token,
            failureMessage:INITIAL_STATE.failureMessage
        }
    }if(action.type===actionTypes.GETSTATE){
        return {
            ...state,
            loading:false,
        }
    }if(action.type===actionTypes.RESEND_TOKEN){
        return {
            ...state,
            failureMessage:action.payload.message
        }
    }if(action.type===actionTypes.CHECK_REF){
        return{
            ...state,
            failureMessage:action.payload.message
        }
    }if(action.type===actionTypes.GET_USER){
        return{
            ...state,
            loading:false,
            ...state.user
        }
    }if(action.type===actionTypes.LOG_OUT){
        return{
            ...state,
            ...INITIAL_STATE
        }
    }
    else{
        return state
    }
}

export default user_reducer;