import React , {Component} from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";

import Camp from "./LetterTemplates/Camp";
import econ from "./LetterTemplates/Eventconduct";
import evenue from "./LetterTemplates/Eventvenue";
import Tatten from "./LetterTemplates/Attendanceteam";
import Patten from "./LetterTemplates/AttendanceParticipants";

class App extends Component {
  render() {
    return (
    <BrowserRouter>
    <div>
        <Switch>
          <Route path="/camp" component={Camp} />
          <Route path="/econ" component={econ} />
          <Route path="/evenue" component={evenue} />
          <Route path="/tatten" component={Tatten} />
          <Route path="/patten" component={Patten} />
        </Switch>
    </div>
    </BrowserRouter>
    );
  }
}

export default App;