import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Dashboard } from './pages/Dashboard';

import { AuthContext } from './context/AuthContext';

export const App = () => {
  // const authContxt = useContext(AuthContext);

  return (
    <>
      <Switch>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Redirect to='/welcome'/>
      </Switch>
    </>
  )
}
