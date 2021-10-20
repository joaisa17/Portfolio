import { Switch, Route, Redirect } from 'react-router-dom';

import * as Pages from './Pages';

export default function App() {
  return <Switch>
    
    <Route exact path="/" component={Pages.Home} />
    <Redirect exact path="/home" to="/" />

    <Route exact path="/about" component={Pages.About} />

    <Route exact path="/projects" component={Pages.Projects} />
    <Route exact path="/projects/music" component={Pages.ProjectPages.Music} />

    <Route exact path="/games" component={Pages.Games} />
    <Route exact path="/games/eirik-vs-adrian" component={Pages.GamePages.EirikVsAdrian} />
    <Route exact path="/games/eirik-vs-adrian-2" component={Pages.GamePages.EirikVsAdrian2} />
    <Route exact path="/games/eirik-vs-adrian-online" component={Pages.GamePages.EirikVsAdrianOnline} />

    {/* Haha funny */}
    <Route exact path="/clickroll" component={Pages.ClickRoll} />
    <Redirect exact path="/secret" to="/clickroll" />

    <Route path="/error" component={Pages.Error} />
    <Redirect to="/error/404" />

  </Switch>
}