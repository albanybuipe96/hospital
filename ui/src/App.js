import { BrowserRouter as Router, Route } from "react-router-dom";

import React from "react";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/Register";
import Dashboard from "./components/screens/Dashboard";
import UserListScreen from "./components/screens/UserListScreen";

import Settings from "./components/screens/Settings";
import UserEditScreen from "./components/screens/UserEditScreen";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/users" component={UserListScreen} />
      <Route path="/admin/user/:user_id/edit" component={UserEditScreen} />
      <Route path="/settings" component={Settings} />
    </Router>
  );
};

export default App;
