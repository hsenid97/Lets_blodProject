import React ,{Component} from 'react';

class SignupUser extends Component
{
    constructor(props)
    {
        super(props);
        this.state={url_path:"https://lets-blog-dinesh.herokuapp.com",};
        this.storeInDataBase.bind(this);
    }

    submitFormHandler(e)
    {
        e.preventDefault();
        console.log("in the from submission with values "+this.refs.username.value);
        let  data={
                username:this.refs.username.value,
                password:this.refs.password.value,
                email:this.refs.email.value,
                fullname:this.refs.fullname.value,
                lastname:this.refs.lastname.value 
             };
        
        this.storeInDataBase(data,e);
    }
    checkTheLoginDetailsAndSaveToken(data,e)
    {
       let sts=false;
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
            localStorage.setItem('displayname',JSON.stringify(data.username));
            window.location.href = this.state.url_path+"/MyApp/LetsBlog/Home/";
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
    storeInDataBase(data,e)
    {
        console.log(data.username+"  sadf "+data.password+data.email+data.displayname);
        fetch(this.state.url_path+"/api/v1/GETallProfile/",
                {
                    method:"POST",
                    body:JSON.stringify(data),
                    headers: {
                        "Content-Type":"application/json",                
                    }
                }                
        )
        .then((response)=>response.ok)
        .then((response)=>{
            if(response)
            {
                
                this.checkTheLoginDetailsAndSaveToken(data,e);
                
            }
            else
            {
                console.log("here");
            }
        });
    }


    render()
    {
        return (
        <div>
            <center>
                    <br/>
                    <br/>
                        <form onSubmit={this.submitFormHandler.bind(this)}>
                            <table style={{color:"white"}}>
                            <tr>
                                <td>
                            <label>Username*</label>
                                </td>
                                <td>
                            <input type="text" ref="username"/>
                                </td>
                            </tr>
                            <br/>
                            <tr>
                                <td>
                            <label>Password*</label>
                            </td>
                                <td>
                         <input type="password" ref="password"/>
                         </td>
                            </tr><br/>
                            <tr><td>
                            <label>Email</label></td><td>
                            <input type="text" ref="email"/>
                            </td>
                            </tr>
                            <br/>
                            <tr>
                            <td>
                            <label>fullname</label></td><td>
                            <input type="text" ref="fullname"/>
                            </td>
                            </tr><br/>
                            <tr>
                            <td>
                            <label>lastname</label></td><td>
                            <input type="text" ref="lastname"/></td>
                            </tr><br/>
                            <tr>
                            <td>
                            <label>displayname</label></td><td>
                            <input type="text" ref="displayname"/>
                            </td>
                            </tr>
                            </table><br/>
                            <input type="submit" value="login"/>
                        </form>
                    </center>
        
        <a href ={this.state.url_path+"/MyApp"}><button>back</button></a>
        </div>
    );
    }
}
export default SignupUser;