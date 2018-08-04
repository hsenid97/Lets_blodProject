import React, { Component } from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import MenuBarComponent from "./Components/MenuBarComponent";
import LoginView from './views/loginview';
import FetchFeedComponent from "./Components/fetchfeedComponent";
import PostBlog from './Components/postblog';
import signupUser from "./Components/signup";
import DisplayProfile from './Components/displayProfile';
import EditProfileComponent from './Components/EditProfile';
import SelfDetailComponent from './Components/selfDetailComponent';
import './App.css';
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={username:" state display",user:0};
  }
  render() {
    return (
      <div>
      <Router>
      <div>
         
         <Route exact path="/MyApp" component={()=><LoginView/>}/> 
         <Route path="/MyApp/LetsBlog" component={()=><MenuBarComponent/>}/>
         <Route exact path="/MyApp/LetsBlog/Home" component={()=><FetchFeedComponent/>}/>
         <Route exact path="/MyApp/LetsBlog/Blog" component={()=><PostBlog/>}/>
         <Route exact path="/MyApp/LetsBlog/Profile" component={()=><DisplayProfile/>}/>
         <Route exact path="/MyApp/LetsBlog/EditPro" component={()=><EditProfileComponent/>}/>
         <Route exact path="/MyApp/LetsBlog/SelfDetail" component={()=><SelfDetailComponent/>}/>
         <Route exact path="/MyApp/signup" component={signupUser} />

        </div>
      </Router>
      </div>    
    );
  }
}

export default App;
//<Route exact path="/MyApp/LetsBlog/User" component={()=><SelfDetailComponent user={this.state.user}/>}/>