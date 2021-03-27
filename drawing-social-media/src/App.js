import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Canvas from "./Pages/Canvas";
import Post from "./Pages/Post"
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/canvas">
          <Canvas />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

// const sendRequest = (e) => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(),
//   };
//   fetch(
//     "http://localhost:5000/getpost?username=hi&picture=aaaaa",
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

export default App;
