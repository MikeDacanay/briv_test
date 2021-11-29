import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Dashboard } from './pages/Dashboard';
import { useStartup } from './customHooks';
import { Title } from './components/Title';

export const App = () => {
  const {route} = useStartup();

  return (
    <>
      <Title/>
      <Switch>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Redirect from='/' to={route}/>
      </Switch>
    </>
  )
}
