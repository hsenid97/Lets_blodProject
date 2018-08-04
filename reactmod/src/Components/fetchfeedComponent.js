import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ViewPost from './viewPost';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'blue',
  },
})
class FetchFeedComponent extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state={list:[]};
    }
    componentDidMount()
    {
        console.log("component did mount");
        let result;
        let data=JSON.parse(localStorage.getItem('token'));
        fetch("http://localhost:8000/api/v1/GETallBlogs/",  
        {    method:"GET",
             headers: new Headers({
            'Authorization': 'JWT '+(data['token']), 
            }), 
        }
        )
        .then((response)=>response.json())
        .then(response=>{result=response;
            this.setState(prev => ( {list : response}));
            console.log(response)})
        .catch(error=>{console.log(error)});

    }
    
    render()
    {
      const {classes}=this.props;
        console.log("in the fetch");
        let displayfeed=this.state.list;
        console.log(this.state.list);
        console.log(typeof displayfeed+" asdf");
        
        return (
            <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper}><ViewPost data={this.state.list}/></Paper>
              </Grid>
              <Grid item xs={2}>
              </Grid>
            </Grid>
          </div>
             
    );
    }
}
FetchFeedComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FetchFeedComponent);
