import React,{Component} from 'react';
import { BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import img1 from "../Components/img1.jpg";

class LoginView extends Component
{

    constructor(props)
    {
        super(props);
        this.state={creds:{},token:"",isAuth:false,usernmae:"",passkey:"",url_path:"https://lets-blog-dinesh.herokuapp.com"};
    }
 
    submitFormHandler(e)
    {
        let data={username:this.refs.username.value,password:this.refs.password.value};
        this.checkTheLoginDetailsAndSaveToken(data,e);
        e.preventDefault();
    }
    checkTheLoginDetailsAndSaveToken(data,e)
    {
       let sts=false;
       console.log(data);
       console.log(this.state.url_path+"/api-jwttoken-auth/");
        fetch(this.state.url_path+"/api-jwttoken-auth/",
        {
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"                
            },
            credentials: "same-origin"
        }
        )
        .then((response)=>{sts=response.ok; return response.json();})
        .then((responseJson)=>
        {
          //  console.log(responseJson);
        
            var token=responseJson;
            if(sts){
            localStorage.setItem('token',JSON.stringify(token));
            
            let datatok=JSON.parse(localStorage.getItem('token'));
            console.log(datatok['token']+" sucess");    
            fetch(this.state.url_path+"/api/v1/EditProfile/",
            {
                method:"GET",
                headers: new Headers({
                    'Authorization': 'JWT '+(datatok['token']), 
                    }),
            })
            .then(response=>response.json())
            .then(response=>
                {
                    localStorage.setItem('displayname',JSON.stringify(response[0].displayname));
                    console.log(response[0].followers);
                    localStorage.setItem('profiles',JSON.stringify(response[0].followers));
                    localStorage.setItem('blogs',JSON.stringify(response[0].blogs));
                }
            );
            
       
       
        }
            if(this.checkAuthentication()){
            this.setState(
               { isAuth:true}
            );             
            
        }
       })
        .catch(error=>
        {
            console.log(error);
        })
        //console.log("after ");
        this.setState();
        e.preventDefault();
    }
    checkAuthentication()
    {
        let judgement=false;
        let token=localStorage.getItem('token');
        console.log(token&&token.length>10);    
        return token && token.length>10;
    }
    render()
    {
        
        let isAuthenticated=this.checkAuthentication();
        console.log("dinesh ");
        console.log(isAuthenticated);
        return (    
            <div>
                
            { 
               isAuthenticated ?
               <Redirect to="/MyApp/LetsBlog/Home"/> :
               (
                <Grid container spacing={24}>
                <Grid item xs={6}>
                <h1>LetsBlog</h1>
                <img src="https://digital110.com/content/wp-content/uploads/2014/03/blogging01.jpg"  className="bgimg" height="400px" width="700px"/>
                </Grid>
                <Grid item xs={6}>
                <div className="login">
                <div className="login-triangle"></div>
                
                <h2 className="login-header">Log in</h2>
              
                <form className="login-container" onSubmit={this.submitFormHandler.bind(this)}>
                  <p><input type="text" placeholder="Username" ref="username" /></p>
                  <p><input type="password" placeholder="Password" ref="password"/></p>
                  <p><input type="submit" value="Log in"/></p>
                </form>
                <center>
                        <Link to="/MyApp/signup" style={{color:"white"}}>Create an Account?</Link>
              </center>
              </div>
              </Grid>
              </Grid>
              )
            }
            </div>
        );
    }
}

export default LoginView;



        
        //  <div>
        //  {} 
        //     isAuthenticated ?
        //     <Redirect to="/MyApp/LetsBlog/Home"/> :
        //      <div>
        //          <center><img src="https://www.everythingdinosaur.com/wp-content/uploads/2017/03/papo_blue_velociraptor2.jpg" height="50" width="50"/></center>
        //          <center>
        //              <form onSubmit={this.submitFormHandler.bind(this)}>
        //                  <div>
        //                  <label>Username</label>
        //                  <input type="text" ref="username"/>
        //                  </div>
        //                  <br/>
        //                  <div>
        //                  <label>Password</label>
        //                  <input type="password" ref="password"/>
        //                  </div>
        //                  <br/>
        //                  <input type="submit" value="login"/>
        //              </form>
        //          </center>
        //      <h1>in the login view </h1>
        //          <center>
        //          <Link to="/MyApp/signup">Signup</Link>
        //          </center>
        //      </div>
        //  }
        //  </div>
     
        /*
//
        how to store in the local storage
        var testObject = { 'one': 1, 'two': 2, 'three': 3 };
localStorage.setItem('testObject', JSON.stringify(testObject));
var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
console.log('retrievedObject: ', retrievedObject);
         */

         /*
         
    checkAuthentication()
     {
        let judgement=false;
        //console.log("in the check");
        let data=(localStorage.getItem('token'));
        //console.log(data);
        
        fetch("http://localhost:8000/api-token-verify/",
        {
            method:"POST",
            body:data,
            headers:{
                "Content-Type":"application/json"                
            },
            credentials: "same-origin"  
        }    
        )
        .then((response)=>{
          //  console.log(response);
            judgement=response.ok;
            this.setState(
            { 
                isAuth:judgement
            }
        );
        })
        .catch(error=>
        {
            console.log("hsenid "+error);
        })
        this.setState();  
        //console.log(judgement);
        return judgement;
    }
    
          */

