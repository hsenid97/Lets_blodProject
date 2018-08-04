import Carditem from './carditem';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { IconButton, Grid, TableCell, TableHead } from '@material-ui/core';
import IndivDis from './Indivdisplay';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.primary,
    },
  });
class ArrangeProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={displaymulti:true,
                    fulldisplay:false,
                    list:[],like:[],url_path:"https://lets-blog-dinesh.herokuapp.com"};
        console.log("const "+this.props);
    }
    handleView(e)
    {
        this.setState(
            {
                displaymulti:false,
                requiredid:e,
            }
        );
        let data=JSON.parse(localStorage.getItem('token'));
        fetch(this.state.url_path+"/api/v1/GETallBlogs/",  
        {    method:"GET",
             headers: new Headers({
            'Authorization': 'JWT '+(data['token']), 
            }), 
        }
        )
        .then((response)=>response.json())
        .then(response=>{
            this.setState( {list : response});
            console.log("response "+    response);
        }
        )
        .catch(error=>{console.log(error)});

        console.log(this.state.fulldisplay);
        e.preventDefault();
    }
    handleLike(e)
    {
               
                let arr=this.state.like;
                arr[e]=!arr[e];
                let data=this.props.data;
                this.setState(
                    {
                        like:arr,
                    }
                );
                let s="";
                for(let i=0;i<arr.length;i++)
                {
                   if(arr[i])
                    {
                     s=s+(i.toString())+",";
                    }
                }
                localStorage.setItem('profiles',JSON.stringify(s));
                var formData = new FormData();
                formData.append('followers',s);
                let datatok=JSON.parse(localStorage.getItem('token'));                
                console.log(datatok['token']+" sucess");   
                let dataStr={'followers':s};
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
    handleViewDetails(e)
    {
        this.setState({fulldisplay:true});
    }
    componentWillReceiveProps(nextprops)
    {
        let datatemp=nextprops.data;
        let followers=JSON.parse(localStorage.getItem('profiles'));
        let arr=[];
                    for(let v=0;v<datatemp.length;v++)
                    {
                        arr[datatemp[v].id]=false;
                        
                    }
       
        if(followers!=null)
        {
        let result=followers.split(",");
                    for(let v=0;v<result.length;v++)
                    {
                        arr[result[v]]=true;
                    }            }
        this.setState({like:arr});
    }

    render()
    {
        
        const {classes}=this.props;
        
        
        let decision=this.state.displaymulti;
        let d=this.props.data;
        let required_profile=d[0];
        for(let i=0;i<d.length;i++)
        {
            if(d[i].id===this.state.requiredid)
            {
                required_profile=d[i];
                break;
            }
     }
      let dp=this.state.url_path;
         if(!decision){
        if(required_profile.profilepic===null)
        {
            
            if(required_profile.gender==='male')dp=dp+'/media/uploads/male.png';
            else    
                dp=dp+'/media/uploads/female.png';
        }
        else
        {
            dp=dp+required_profile.profilepic;
        }
    }
        let disfull=this.state.fulldisplay;
        return(
                <div>{
                decision
                ?
                (<div>
                <div >
            <Grid container spacing={24}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Paper ><center>
                    {this.props.data.map((profile)=>(<IndivDis profile={profile} key={profile.id} onView={this.handleView.bind(this)} onLike={this.handleLike.bind(this)} likevalue={this.state.like[profile.id]}/>))}
                    </center></Paper>
              </Grid>
              <Grid item xs={3}>
              </Grid>
            </Grid>
          </div>
            </div>)
                :(
                    <div>
                        <br/>
                        <br/>
                            <Grid container spacing={24}>
                                <Grid item xs={3}>
                                
                                <img src={dp}  
                                    width="200" height="200" />
                            
                                </Grid>
                                <Grid item xs={6} >
                                <Paper>
                                <Table style={{ tableLayout: 'auto',color:"white" }} fixedHeader={false}>
                                    
                                        <TableBody>
                                             <TableCell>Name
                                             </TableCell>
                                             <TableCell>{required_profile.displayname}
                                             </TableCell>
                                        </TableBody>
                                        {
                                            (disfull)?
                                            (
                                            <TableBody>   
                                            <TableRow>
                                                <TableCell>FirstName
                                                </TableCell>
                                                <TableCell>{required_profile.firstname}
                                                </TableCell>
                                            </TableRow>
                                                
    <TableRow>
<TableCell>LastName
</TableCell>
<TableCell>{required_profile.lastname}
</TableCell>
</TableRow>
<TableRow>
     <TableCell>Gender
     </TableCell>
     <TableCell>{required_profile.gender}
     </TableCell>
</TableRow>
<TableRow>
     <TableCell>Mobileno
     </TableCell>
     <TableCell>{required_profile.mobileno}
     </TableCell>
</TableRow>
<TableRow>
     <TableCell>DateOfBirth
     </TableCell>
     <TableCell>{required_profile.dateOfBirth}
     </TableCell>
</TableRow>

                                             </TableBody>   
                                            ):
                                           (
                                            <center>
                                            <svg onClick={this.handleViewDetails.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>    
                                            </center>
                                           )
                                        }
                                        
                                    
                                </Table>
                                </Paper>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>
                            <br/>
                            <br/>
                            <Grid container spacing={24}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                            <Paper >
                            {
                                this.state.list.map((item)=>((item.userinfo===required_profile.id)?<Carditem card={item} key={item.id} profiledata={required_profile} />:(<a/>)))
                            }
                            </Paper>
                            </Grid>
                            <Grid item xs={3}></Grid>
                            </Grid>
                    </div>
                )
            }
                </div>
              );   
    }
}

ArrangeProfile.propTypes = {
    classes: PropTypes.object.isRequired
  };
export default withStyles(styles)(ArrangeProfile);
