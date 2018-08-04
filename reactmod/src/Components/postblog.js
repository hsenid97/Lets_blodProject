import React ,{Component} from 'react';
import { BrowserRouter as Route,Link,Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class PostBlog extends Component
{
    constructor(props)
    {
        super(props);
        this.state={change:false};
    }
    handleFormSubmit(e)
    {
        let url="";
        let meth="";
        if(this.props.sd==true){
            console.log("in the handleeditsubbmit");
            
         url="http://localhost:8000/api/v1/EditBlogs/"+this.props.blog.id+"/";
         console.log(url);
        meth="PUT";
        
        }
        else
        {
            meth="POST";
            url="http://localhost:8000/api/v1/GETallBlogs/";    
        }
        console.log(this.refs.blogTitle.value);
        let data={blogTitle:this.refs.blogTitle.value,
                  blogPost:document.getElementById('text').value};
        let dataTok=JSON.parse(localStorage.getItem('token'));
        fetch(url,
        {
            body:JSON.stringify(data),
            method:meth,
            headers: new Headers({
            "Content-Type":"application/json",
           'Authorization': 'JWT '+(dataTok['token']), 
           }), 
        })
        .then((response)=>response.ok)
        .then((response)=>
        {   

                if(response)
                {
                    this.setState({change:true});
                }
                console.log(response);
        });
        e.preventDefault();

    }
   
    render( )
    {
        let checkinfo=this.state.change;
        console.log(checkinfo+" in the render");
        console.log(this.props.sd);
        console.log(this.props.blog);
        let blogtitle="",blogpost="";
        console.log(this.props.blog);
        if(this.props.sd)
        {
            blogtitle=this.props.blog.blogTitle;
            blogpost=this.props.blog.blogPost;
        }
        return( 
            <div>
                {
            (checkinfo) ?
            <Redirect to= "/MyApp/LetsBlog/Home" />:
            (
                    <div id="wrapper">
                    <br/>
                    <center>
                     <form id="paper" onSubmit={this.handleFormSubmit.bind(this)}>
                        
                        <div id="margin">
                        Title:
                        <input id="title" type="text" name="text" ref="blogTitle" defaultValue={blogtitle}/>                         
                        </div>
                        <textarea placeholder="Enter 
                        blog here"  id="text" rows="4" defaultValue={blogpost}>
                        </textarea>
                        <br/>
                        
                        <input className="button button1" type="submit" 
                                 value={this.props.sd?"Update":"Create"}/>
                        
                </form>
                </center>
               
            </div>)
                }
            </div> 
        
        );
    }
}

export default PostBlog;

// <center>
// <form onSubmit={this.handleFormSubmit.bind(this)}>
//        <br/>
//        <div>
//            <label>BlogTitle</label>
//            <input type="text" ref="blogTitle"/>
//        </div>
//        <br/>   
//        <div>
//            <label>BlogPost</label>
//        </div>
//        <div>
//        <textarea id="post" rows="25" cols="70">
//        </textarea>
//        </div>
//        <input type="submit" 
//        style={{
//            backgroundColor:"grey",
//            fontFamily: "sans-serif'",
//            color:"white",
//            fontSize: 20,
//            }}              value="post"/>
       
// </form>
// </center>

