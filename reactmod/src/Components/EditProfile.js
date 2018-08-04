import React,{Component} from 'react';
import DisplayEditProfile from './displayEditProfile';
class EditProfileComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state={profile:[],url_path:"https://lets-blog-dinesh.herokuapp.com"};
    }
    componentDidMount()
    {
        let data=JSON.parse(localStorage.getItem('token'));
        fetch(this.state.url_path+"/api/v1/EditProfile/",
        {
            method:'GET',
            headers:new Headers(
                {
                    'Authorization': 'JWT '+(data['token']), 
                }
            ),
        })
        .then((response)=>response.json())
        .then(response=>
            {
                this.setState(prev=>({profile:response}));
                console.log("asdf "+response);
            }
        )
    }
    render()
    {
        
        
        console.log(this.state.profile);
        return(
            <div>
                {this.state.profile.map((prof)=>(<DisplayEditProfile profile={prof} key={prof.id}/>))};
            </div>
        );
    }
}

export default EditProfileComponent;