import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import Drivers from "./Pages/Drivers/Drivers";
import Driver from "./Pages/Driver/Driver";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/drivers"><Drivers/></Route>
        <Route path="/drivers/:name"><Driver/></Route>
      </Switch>
    </Router>
  );
}

export default App;
