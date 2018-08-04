import React ,{Component} from 'react';
import SelfComponent from './selfComponent';
  
class SelfDetailComponent extends Component
{
    constructor(props)
    {
      super(props);
      this.state={profile:[],allprofile:[],blogdata:[],temp:false};
    }
    componentDidMount()
    {
      let data=JSON.parse(localStorage.getItem('token'));
      fetch("http://localhost:8000/api/v1/EditProfile/",
      {
          method:"GET",
          headers: new Headers({
              'Authorization': 'JWT '+(data['token']), 
              }), 
      })
      .then((response)=>response.json())
      .then((response)=>{
      console.log(response);
      this.setState({profile:response});
      }
      );
      fetch("http://localhost:8000/api/v1/GETallBlogs/",
      {
          method:"GET",
          headers: new Headers({
              'Authorization': 'JWT '+(data['token']), 
              }), 
      })
      .then((response)=>response.json())
      .then((response)=>{
      console.log(response);
      this.setState({blogdata:response});
      }
      );
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
      this.setState({allprofile:response});
      }
      );
      
    }
    handleDelete()
    {
        console.log("parent");
        this.setState(prevstate=>(
            {
                temp:!prevstate.temp,
            }
        ));
    }
    render()
    {
        
        return (
          <SelfComponent profile={this.state.profile} allprofile={this.state.allprofile} blogdata={this.state.blogdata} del={this.handleDelete.bind(this)}/>

        );
    }
}
export default SelfDetailComponent;