import React ,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';



class Carditem extends Component{
    constructor(props)
    {
        super(props);
        this.state={toggle:true,like:false,temp:false,delete:false};
    }
    
    toggleUp(e)
    {
        this.setState(prevState => ({
            toggle: !prevState.toggle
          }));
        e.preventDefault();
    }
    handleLikeCount()
    {
        
        console.log(this.state+"in the like");
        this.props.onlike(this.props.card.id);
    }
    handleEdit()
    {
        console.log("in the card edit "+this.props.card.id);
        this.props.onEdit(this.props.card.id);
    }
    handleDelete()
    {
        let data=JSON.parse(localStorage.getItem('token'));
        let url="http://localhost:8000/api/v1/EditBlogs/"+this.props.card.id+"/";
        fetch(url,
            {
                method:"DELETE",
                headers: new Headers({
                "Content-Type":"application/json",
                'Authorization': 'JWT '+(data['token']), 
                }),
            }
        )
        .then(response=>(response.ok))
        .then(response=>
        {
            console.log(response);
            if(response)
            {
                    this.setState({delete:true});
                    this.props.onDelete();
            }
        })
        .catch(error=>
        {
            console.log(error);
        });
        console.log("delete")
    }
    render()
    {

        let content,bname;
        if(this.state.toggle)
        {
            bname="Full Content";
            content=this.props.card.blogPost.substring(0,100);
        }
        else
        {
            bname="Less Content";
            content=this.props.card.blogPost;
        }
        let dp="http://localhost:8000";
         
        
        if(this.props.profiledata.profilepic===null)
        {
            
            if(this.props.profiledata.gender==='male')dp=dp+'/media/uploads/male.png';
            else    
                dp=dp+'/media/uploads/female.png';
        }
        else
        {
            dp=dp+this.props.profiledata.profilepic;
        }
    
        console.log(this.props.profiledata);
        return (
            <div>
            <Paper elevation={20}>
           <Card >
             <br/>
            <img src={dp} height="50" width="100" /><h3>User:{this.props.profiledata.displayname}</h3>
            <CardContent>
             <Typography gutterBottom variant="headline" component="h2">
               {this.props.card.blogTitle}
             </Typography>
             <Typography component="p">
             {content}
             </Typography>
           </CardContent>
           {(!this.props.sd)?
                <CardActions>
                <IconButton aria-label="Add to favorites" >
                 {
                   (this.props.likests)?<FavoriteIcon onClick={this.handleLikeCount.bind(this)} style={{color:"red"}}/>
                   :<FavoriteIcon onClick={this.handleLikeCount.bind(this)}/>
                 }
                   
                 </IconButton>
                  {/* <Button size="small" color="primary">
                    Comment
                  </Button>
                  <IconButton aria-label="Share">
                   <ShareIcon />
                 </IconButton>
                 <IconButton aria-label="Share">
                   <SaveIcon />
                 
                 </IconButton>
                  */}
                 <Button size="small" color="primary" onClick={this.toggleUp.bind(this)}>
                    {bname}
                  </Button>
                </CardActions>
              
                :
                <CardActions>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleEdit.bind(this)} width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>								
                  <Button size="small" color="primary" onClick={this.toggleUp.bind(this)}>
                    {bname}
                  </Button>
                  {
        (this.state.del)
            ?<a/>
            :
    (<svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleDelete.bind(this)} width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>)
                  }
                  
                </CardActions>
            }
           </Card>
         
         </Paper>
           <br/>
           </div>
   
       );    
    }
}
export default Carditem;