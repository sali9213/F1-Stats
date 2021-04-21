import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import Drivers from "./Pages/Drivers/Drivers";
import Driver from "./Pages/Driver/Driver";
import Constructor from "./Pages/Constructor/Constructor";
import './App.css';
import Race from './Pages/Race/Race';
import Season from './Pages/Season/Season';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/drivers" component={Drivers}/>
        <Route path="/drivers/:name" component={Driver}/>
        {/* <Route exact path="/constructors" component={Constructors}/> */}
        <Route path="/constructors/:constructorId" component={Constructor}/>
        <Route exact path="/seasons/:season" component={Season}/>
        <Route path="/seasons/:season/:round" component={Race}/>
      </Switch>
    </Router>
  );
}

export default App;
