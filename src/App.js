import { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Pages/Home/Home";
import Login from "./components/Security/Login/Login";
import PrivateRoute from "./components/Security/PrivateRoute/PrivateRoute";
import Profile from "./components/Utils/Profile";
import ViewProfile from "./components/Utils/ViewProfile";

export const UserContext = createContext();

function App() {

  const [userInfo, setUserInfo] = useState({});
  const [singleClient, setSingleClient] = useState({});

  return (
    <UserContext.Provider value={[userInfo, setUserInfo, singleClient, setSingleClient]}>
    <Router>
      <Switch>
          <PrivateRoute exact path="/">
            <Home/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/profile">
            <Profile/>
          </PrivateRoute>
          <PrivateRoute path="/view-profile">
            <ViewProfile/>
          </PrivateRoute>
      </Switch>
      <ToastContainer/>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
