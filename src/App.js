import { Switch, Route, Redirect } from 'react-router-dom';

import * as Pages from './Pages';

export default function App() {
  return <Switch>
    
    <Route exact path="/" component={Pages.Home} />
    <Redirect exact path="/home" to="/" />

    <Route exact path="/secret" component={Pages.Secret} />

    <Route path="/error" component={Pages.Error} />

    <Redirect to="/error/404" />

  </Switch>
}