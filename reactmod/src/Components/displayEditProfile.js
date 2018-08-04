import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import React,{Component} from 'react';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
      },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: 'black',
    },
    table: {
        color:'red',
        minWidth: 700,
      },
      palette: { 
        primary: {
        main: '#26c6da',
      },
      input: {
        margin: theme.spacing.unit,
      },        
      },
  })
  const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
    backgroundColor:theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 14,
    },
  }))(TableCell);
class DisplayEditProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={firstname:(this.props.profile.firstname==null?"":this.props.profile.firstname),
                    lastname:(this.props.profile.lastname==null?"":this.props.profile.lastname),
                    displayname:(this.props.profile.displayname==null?"":this.props.profile.displayname),
                    dateOfBirth:(this.props.profile.dateOfBirth==null?"":this.props.profile.dateOfBirth),
                    gender:(this.props.profile.gender==null?"":this.props.profile.gender),
                    mobileno:(this.props.profile.mobileno==null?"":this.props.profile.mobileno),
                    flag:false,    
                };
    }
    handleSubmit(e)
    {
        console.log("in the handlesubmit");
        var formData = new FormData();
        formData.append('firstname',this.state.firstname);
        formData.append('lastname',this.state.lastname);
        formData.append('displayname',this.state.displayname);
        formData.append('dateofBirth',this.state.dateOfBirth);
        formData.append('gender',this.state.gender);
        formData.append('mobileno',this.state.mobileno);
        console.log(this.props.profile.profilepic+" -----");
        
        if(this.state.flag)
            formData.append('profilepic',this.state.profilepic);
        console.log(formData);
        let data=JSON.parse(localStorage.getItem('token'));
        fetch("http://localhost:8000/api/v1/EditProfile/",
        {
            method:"PUT",
            body:formData,
            headers:new Headers(
                {
                    'Authorization': 'JWT '+(data['token']), 
                }
            ),    
        })
        .then(response=>response.ok)
        .then(response=>{
            console.log(response);
        })
        e.preventDefault();
    }
  
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }; 
    handleFile=event=>{
        console.log(event.target.files[0]);
        this.setState(
            {
                "profilepic":event.target.files[0],
                flag:true,
            }
        )
    }
     render()
    {
        console.log(this.props.profile);
        const {classes}=this.props;
        return(
            <div>
            <br/>
            <Grid container spacing={24}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Table  style={{
                        position:'relative',
                        border:0,        
                  }}>
                <TableBody>                    
                <TableRow className={classes.table}>
                        <CustomTableCell>FirstName
                        </CustomTableCell>
                        <TableCell>
                            <Input
                                defaultValue={this.props.profile.firstname}
                                className={classes.input}
                                onChange={this.handleChange('firstname')}
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.table}>
                        <CustomTableCell>LastName
                        </CustomTableCell>
                        <TableCell>
                            <Input
                                defaultValue={this.props.profile.lastname}
                                className={classes.input}
                                onChange={this.handleChange('lastname')}
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.table}>
                        <CustomTableCell>DisplayName
                        </CustomTableCell>
                        <TableCell>
                        <Input
                                defaultValue={this.props.profile.displayname}
                                className={classes.input}
                                onChange={this.handleChange('displayname')}
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.table}>
                        <CustomTableCell>DateOfBirth
                        </CustomTableCell>
                        <TableCell>
                        <Input
                                defaultValue={this.props.profile.dateOfBirth}
                                className={classes.input}
                                onChange={this.handleChange('dateOfBirth')}
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.table}>
                        <CustomTableCell>Gender
                        </CustomTableCell>
                        <TableCell>
                        <Input
                                defaultValue={this.props.profile.gender}
                                className={classes.input}
                                onChange={this.handleChange('gender')}
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.table}>
                        <CustomTableCell>MobileNo
                        </CustomTableCell>
                        <TableCell>
                        <Input
                                defaultValue={this.props.profile.mobileno}
                                className={classes.input}
                                onChange={this.handleChange('mobileno')}
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.table}>
                        <CustomTableCell>ProfilePic
                        </CustomTableCell>
                        <TableCell>
                        <Button
                            
                            label='My Label' >
                            <input type="file" id="image" onChange={this.handleFile.bind(this)} />
                        </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                <br/>
                <center><Button variant="contained" onClick={this.handleSubmit.bind(this)} color="primary" className={classes.button}>
                        Submit
                        </Button>
                </center>
            </Grid>
            <Grid item xs={3}>
            </Grid>
          </Grid>
          </div>
        
        );
    }
}
DisplayEditProfile.propTypes = {
    classes: PropTypes.object.isRequired
  };
export default withStyles(styles)(DisplayEditProfile);