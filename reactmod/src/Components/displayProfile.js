import React,{Component} from 'react';
import ArrangeProfile from './ArrangeProfile';

class DisplayProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={profdata:[],url_path:"https://lets-blog-dinesh.herokuapp.com"};
    }
    componentDidMount()
    {
        let data=JSON.parse(localStorage.getItem('token'));
        fetch(this.state.url_path+"/api/v1/GETallProfile/",
        {
            method:"GET",
            headers: new Headers({
                'Authorization': 'JWT '+(data['token']), 
                }), 
        })
        .then((response)=>response.json())
        .then((response)=>{
        console.log(response);
        this.setState({profdata:response});
        }
        );
    }
    render()
    {
           return(<ArrangeProfile data={this.state.profdata}/>);
    }
}
export default DisplayProfile;
