import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import JobRoute from './components/JobRoute'
import NotFound from './components/NotFound'
import JobDetailsCard from './components/JobDetails'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailsCard} />
    <Route component={NotFound} />
  </Switch>
)

export default App
