import './App.css';
import React, { Fragment } from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginPage from './Components/Login/LoginPage';
import UserPage from './Components/UserProfile/UserPage';
import SignUp from './Components/SignUp/SignUp';
import LoginWithCode from './Components/LoginWithCode/LoginWithCode';

function App() {
  return (
    <div className="App">
      <Fragment>
     <Router>
     <div className="app-container">
       <h1>BASIS ASSIGNMENT</h1>
       <Switch>      
       <Route exact path="/user/:id" render={props=> <UserPage {...props}/>} />
       <Route exact path="/signUp" render={props=><SignUp {...props}/>}/>  
       <Route exact path="/verifyCode" render={props=><LoginWithCode {...props}/>}/>
       <Route exact path="/" render={props=> <LoginPage {...props}/>} />     
       </Switch>
     </div>
   </Router> 
   </Fragment>
   
    </div>
  );
}

export default App;
