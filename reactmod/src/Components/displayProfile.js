import React,{Component} from 'react';
import ArrangeProfile from './ArrangeProfile';

class DisplayProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={profdata:[]};
    }
    componentDidMount()
    {
        let data=JSON.parse(localStorage.getItem('token'));
        fetch("http://localhost:8000/api/v1/GETallProfile/",
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
