import { useState } from 'react';
import './App.css';
import { Switch, Route, useParams } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import MenuBar from './MenuBar';

function App() {
  const [user, setUser] = useState(false);
  const [projects, setProjects] = useState([])

  return (
    <div className='App'>
      <MenuBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path='/login'>
          <Login user={user} setUser={setUser} />
        </Route>
        <Route exact path='/'>
          <Home
            user={user}
            setUser={setUser}
            projects={projects}
            setProjects={setProjects}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
