import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Canvas from "./Pages/Canvas";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/canvas">
          <Canvas />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <button onClick={sendRequest}>click</button>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const sendRequest = (e) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  fetch(
    "http://localhost:5000/getpost?username=hi&picture=aaaaa",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export default App;
