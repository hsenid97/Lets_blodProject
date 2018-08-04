import React ,{Component} from 'react';
import  Redirect from 'react-router-dom';
class Temphange extends Component{
    
    render(){
        console.log("wow");
        
        return (
            <div>
                   <Redirect exact to={{ pathname: "/",}} /> 
            </div>
        )
    }
}

export default Temphange;