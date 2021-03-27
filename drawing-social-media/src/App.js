import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Pages/Login'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <button onClick={sendRequest}>click</button>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const sendRequest = (e) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  };
  fetch('http://localhost:5000/getpost?username=hi&picture=aaaaa', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}

export default App;
