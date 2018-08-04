import React ,{Component} from 'react';
import Carditem from './carditem';

class ViewPost extends Component
{
    constructor(props)
    {
        super(props);
        this.state={like:[],url_path:"https://lets-blog-dinesh.herokuapp.com"};
    }
    handleLike(e)
    {
        console.log("in the view"+e);
        let arr=this.state.like;
        arr[e]=!arr[e];
        this.setState({like:arr});
        let s="";
        for(let i=0;i<arr.length;i++)
        {
           if(arr[i])
            {
             s=s+(i.toString())+",";
            }
        }
        localStorage.setItem('blogs',JSON.stringify(s));
        var formData = new FormData();
        formData.append('blogs',s);
        let datatok=JSON.parse(localStorage.getItem('token'));                
        console.log(datatok['token']+" sucess");   
        fetch(this.state.url_path+"/api/v1/EditProfile/",
        {
            method:"PUT",
            body:formData, 
            headers: new Headers({
                'Authorization': 'JWT '+(datatok['token']), 
                }),
        })
        .then(response=>response.json())
        .then(response=>
            {
                console.log(response);
            }
        );


    }
    componentWillReceiveProps(nextprops)
    {
       let datatemp=nextprops.data;
       
       let followers=JSON.parse(localStorage.getItem('blogs'));
       console.log(followers);
       let arr=[];
                    for(let v=0;v<datatemp.length;v++)
                    {
                        arr[datatemp[v].id]=false;
                        
                    }
       
       if(followers!=null){
        let result=followers.split(",");
       
                    for(let v=0;v<result.length;v++)
                    {
                        arr[result[v]]=true;
                    }
        }
                    this.setState({like:arr});
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
    sendprops(item,pdata){
        
         try{
         for(let v=0;v<pdata.length;v++)
         {
             if(pdata[v].id==item.userinfo)
             {
                 return pdata[v];
             }
         }
        }
        catch(error)
        {
            return false;   
        }
    }
    render()
    {
          
        console.log(this.props.data+"view post");
        let pdata=this.state.profdata;
        return(
            <div>
                {
                    this.props.data.map((item)=>(<Carditem card={item} key={item.id} onlike={this.handleLike.bind(this)} likests={this.state.like[item.id]} 
                    profiledata={this.sendprops(item,pdata)}/>
                         ))
                }
                
            </div>
         );
    }
}
export default ViewPost;
