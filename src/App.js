import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/RegisterAndLoginUser";
import "./App.css";
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </BrowserRouter>
    </div>
  );
};

export default App;
