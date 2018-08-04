import PostBlog from './postblog';
import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import IndivDis from './Indivdisplay';
import Carditem from './carditem';
class SelfComponent extends Component{
    constructor(props)
    {
        super(props);
        this.state={dp:"",details:false,profiledetails:false,blogdetails:false,secondphase:false,id:"",temp:false,
        url_path:"https://lets-blog-dinesh.herokuapp.com",};
    }
    
    getImageSrc(stat)
    {
      let dp=this.state.url_path;
      
      if(stat.profilepic===null)
        {
            
            if(stat.gender==='male')dp=dp+'/media/uploads/male.png';
            else    
                dp=dp+'/media/uploads/female.png';
        }
        else
        {
            dp=dp+stat.profilepic;
        }
        
        return dp;
    }
    componentWillReceiveProps(nextprops)
    {
        try{
            let stat=nextprops.profile;
            this.setState({dp:this.getImageSrc(stat[0])});
        }
        catch(error)
        {
            return;
        }
        
        
    }
    handleViewDetails()
    {
        this.setState({details:true});
    }
    handleBlogDetails()
    {
        this.setState({blogdetails:true});
    }
    handleprofileDetails()
    {
        this.setState({profiledetails:true});
    }
    fun(c)
    {
        console.log(c.userinfo+" jereasd "+this.props.profile);
    }
    getuser(num)
    {
        
        try{
        for(let v=0;v+1<this.props.allprofile.length;v++)
        {
            //console.log(this.props.allprofile[parseInt(v)].id +" "+num);
            if(this.props.allprofile[parseInt(v)].id==num){
              //  console.log("im here");
                return this.props.allprofile[parseInt(v)];

            }
        }
        }
        catch(error)
        { return; }
    }
    getblog(num)
    {
        console.log("getblog "+num);
        console.log(this.props.blogdata);
        try{
        for(let v=0;v<this.props.blogdata.length;v++)
        {
            console.log(this.props.blogdata[parseInt(v)].id +" "+num+" "+v);
            if(this.props.blogdata[parseInt(v)].id==num){
               console.log("im getblog ");
               console.log(this.props.blogdata[parseInt(v)]);
                return this.props.blogdata[parseInt(v)];

            }
        }
        }
        catch(error)
        { return; }
    }
    handleEdit(id)
    {
        console.log(this.props.blogdata+"in here "+id)
        this.setState({id:id,secondphase:true});        
    }
    handleDelete()
    {
        console.log("sekf delte");
        this.props.del();
    }
    //((item.userinfo === this.props.profile[0].id)?<Carditem card={item} key={item.id}/>:(<a/>))      
    render(){
        let followers=JSON.parse(localStorage.getItem('profiles'));
        let result=followers.split(",");
        result.splice(-1,1);
        console.log(result);
        
        return(
            <div>
                {!this.state.secondphase?
                <div>
                <br/>
                <Grid container spacing={8}>
                    <Grid item xs={1}></Grid>              
                    <Grid item xs={4}>
                    <img src={this.state.dp} height="200" width="200"/>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper>
                        <br/>
                        {
                            (this.state.details)?
                            (
                                
    <Table>
    <TableBody>
                                                 <TableCell>Name
                                                 </TableCell>
                                                 <TableCell>{this.props.profile[0].displayname}
                                                 </TableCell>
                                            </TableBody>
                                          
                                <TableBody>   
                                <TableRow>
                                    <TableCell>FirstName
                                    </TableCell>
                                    <TableCell>{this.props.profile[0].firstname}
                                    </TableCell>
                                </TableRow>
                                    
    <TableRow>
    <TableCell>LastName
    </TableCell>
    <TableCell>{this.props.profile[0].lastname}
    </TableCell>
    </TableRow>
    <TableRow>
    <TableCell>Gender
    </TableCell>
    <TableCell>{this.props.profile[0].gender}
    </TableCell>
    </TableRow>
    <TableRow>
    <TableCell>Mobileno
    </TableCell>
    <TableCell>{this.props.profile[0].mobileno}
    </TableCell>
    </TableRow>
    <TableRow>
    <TableCell>DateOfBirth
    </TableCell>
    <TableCell>{this.props.profile[0].dateOfBirth}
    </TableCell>
    </TableRow>
    
                                 </TableBody>   
    </Table>                           ):
                            <div><center>UserDetails</center>
                            <center>
                            {  <svg onClick={this.handleViewDetails.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>    
                            } 
                            </center></div>
                        }
                    </Paper>
                        </Grid>
                        <Grid item xs={1}></Grid>              
                </Grid>  
                <br/>
                <br/>
                    <Grid container spacing={24}>
                    <Grid item xs={1}>
                    </Grid>
                    
                    <Grid item xs={5}>
                    <Paper>
                    {
                            (this.state.blogdetails)?
                            <div><br/>{
                                
                                this.props.blogdata.map((item)=>(
                                    ((item.userinfo === this.props.profile[0].id)?<Carditem sd={true} card={item} key={item.id} profiledata={this.props.profile[0]} onEdit={this.handleEdit.bind(this)} onDelete={this.handleDelete.bind(this)}/>:(<a/>))      
                                ))}
                            </div>:(<div>
                            Blogs
                            <center>
                            {  <svg onClick={this.handleBlogDetails.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>    
                            } 
                            </center></div>)
                    }
                    </Paper>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <Paper>{
                            (this.state.profiledetails)?
                            <div><br/>{
                                
                                result.map((item)=>
                                    {
                                            console.log(this.getuser(item));
                                return (<IndivDis profile={this.getuser(item)} key={item} sd={true} />)
                                     })      
                                }
                            </div>:<div>
                            UserFollowing
                            <center>
                            {  <svg onClick={this.handleprofileDetails.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>    
                            } 
                            </center></div>
                        }
                    </Paper>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    
                    </Grid>
                </div>
            :
            <PostBlog blog={this.getblog(this.state.id)} sd={true}/>
            }
            </div>
            
    );
    }
}
export default SelfComponent;

          