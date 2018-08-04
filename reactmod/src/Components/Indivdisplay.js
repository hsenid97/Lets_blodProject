import Carditem from './carditem';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton, Grid, TableCell, TableHead } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import FavoriteIcon from '@material-ui/icons/Favorite';
class IndivDis extends Component
{
    constructor(props)
    {
        super(props);
        this.state={url_path:"https://lets-blog-dinesh.herokuapp.com"};
    }
    
    onChangeView()
    {
        console.log(this.props);
        this.props.onView(this.props.profile.id);
    }
    onLikeView()
    {
        console.log("liked");
        this.props.onLike(this.props.profile.id);
    }
    render()
    {
        let dp=this.state.url_path;
        let fname,lname,displayname,fc,ffc=[];
        let fcount=0;
        try{
         fname=this.props.profile.firstname;
         lname=this.props.profile.lastname;
         if(this.props.profile.profilepic===null)
        {
            
            if(this.props.profile.gender==='male')dp=dp+'/media/uploads/male.png';
            else    
                dp=dp+'/media/uploads/female.png';
        }
        else
        {
            dp=dp+this.props.profile.profilepic;
        }
        if(fname===null)
            fname=" ";
        if(lname===null)
            lname=" ";
        
        if(this.props.profile.followers!=null)
        {
            ffc=this.props.profile.followers.split(",");
            fcount=ffc.length-1;
        }
        

         fc=this.props.profile.followersCount;
         displayname=this.props.profile.displayname;
        }
        catch(error)
        {
            fname=" ";
            lname=" ";
            fc=0;
            ffc=0;
            displayname="";
            dp=dp+'/media/uploads/male.png'
        }
            
            return(                
            <div>
                <Paper elevation={20}>
                <Card>
                    
                        <img src={dp}  height="100px" width='100px'/>    
                    
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                     {displayname}
                    </Typography>
                    <Typography>
                        
                        <div>
                            <label>Name:</label> 
                            {fname+" "+lname}
                        </div>
                        <div>   
                            <label>Followers:</label>
                            {fc}
                        </div>
                        <div>
                            <label>Following:</label>
                            {fcount}
                        </div>                 
                        
                    </Typography>
                    </CardContent>
                    { (!this.props.sd)?
                    <CardActions>
                    <Grid container spacing={24}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}>
                        <IconButton aria-label="Add to favorites" >
                        {
                            this.props.likevalue?<FavoriteIcon onClick={this.onLikeView.bind(this)} style={{color:"red",}} />:
                            <FavoriteIcon onClick={this.onLikeView.bind(this)}  />
                        }
                        
                        </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={2}>
                        <Button size="small" color="primary" onClick={this.onChangeView.bind(this)} >View</Button>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                        
                        
                </CardActions>
                :(<a/>)
                    }
                    </Card>
                </Paper>
                <br/>
            </div>           
        );
    }
}
export default IndivDis;