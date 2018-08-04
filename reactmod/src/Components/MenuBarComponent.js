import React,{Component} from "react";
import {AppBar } from '@material-ui/core';
import { BrowserRouter as Router,Link,Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

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
    color: theme.palette.text.secondary,
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
})

class MenuBarComponent extends Component
{

    logout()
    {
        localStorage.removeItem('token');
        //this.setState({temp:"asdf"});
    }
    checkAuth()
    {
      let data=localStorage.getItem('token');
      console.log("logout "+data);
      return data && data.length>10;
    }
    render(){
        let name=JSON.parse(localStorage.getItem('displayname'));
        let isAuthenticated=this.checkAuth(); 
        console.log("auth  "+isAuthenticated);
        const {classes}=this.props;
        return(
             <div>
               { 
                !isAuthenticated ?
                <Redirect to="/MyApp/" />:
                <AppBar position="static">
                <div className={classes.root}>
               <Grid container spacing={24}>
                 
                 <Grid item xs={1}>
                 <Paper>
                   <a className="top">LetsBlog</a>
                  </Paper> 
                 </Grid>
                 <Grid item xs={1}>
                 </Grid>
                 <Grid item xs={1}>
                 <a className="linkref" href ="http://localhost:8000/MyApp/LetsBlog/Home"><Button color="inherit">Home</Button></a>
                 </Grid>
                 <Grid item xs={1}>
                 <a className="linkref" href ="http://localhost:8000/MyApp/LetsBlog/Blog"><Button color="inherit">Blog</Button></a>
                 </Grid>
                 <Grid item xs={1}>
                 <a className="linkref" href ="http://localhost:8000/MyApp/LetsBlog/EditPro"><Button color="inherit">EditPro</Button></a>
                 </Grid>
                 <Grid item xs={1}>
                 <a className="linkref" href ="http://localhost:8000/MyApp/LetsBlog/Profile"><Button color="inherit">People</Button></a>
                 </Grid>
                 <Grid item xs={1}>
                 <a className="linkref" href ="http://localhost:8000/MyApp/LetsBlog "><Button color="inherit" onClick={this.logout.bind(this)}>LogOut</Button></a>
                 </Grid>
                  <Grid item xs={1}>
                 <a className="linkref" href ="http://localhost:8000/MyApp/LetsBlog/SelfDetail"><Button color="inherit">{JSON.parse(localStorage.getItem('displayname'))}</Button></a>
                 </Grid>
                 
          </Grid>
             </div>
                </AppBar>
             }
             </div>
        
        );
    }
}
MenuBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuBarComponent);
