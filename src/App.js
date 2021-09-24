import { Switch, Route, Redirect } from 'react-router-dom';

import * as Pages from './Pages';

export default function App() {
  return <Switch>
    
    <Route exact path="/" component={Pages.Home} />
    <Redirect exact path="/home" to="/" />

    <Route exact path="/about" component={Pages.About} />
    <Route exact path="/games" component={Pages.Games} />
    <Route exact path="/games/eirik-vs-adrian" component={Pages.GamePages.EirikVsAdrian} />

    <Route path="/error" component={Pages.Error} />
    <Redirect to="/error/404" />

  </Switch>
}