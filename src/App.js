import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Courses from "./components/Courses";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/'> <Home/> </Route>
        <Route path='/login'><Login/> </Route>
        <Route path='/register'><Register/></Route>
        <Route path='/courses'><Courses/></Route>
      </Switch>
    </div>
  ); 
};

export default App;
