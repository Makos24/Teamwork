import React, { Suspense, lazy } from "react";
import store from "store";
import "./App.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const Users = lazy(() => import("./components/admin/Users"));
const Feed = lazy(() => import("./components/employee/Feed"));
const Articles = lazy(() => import("./components/employee/Articles"));
const Gifs = lazy(() => import("./components/employee/Gifs"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    store.remove("twk-userData");
    window.location.reload();
  }
  render() {
    let logoutBtn;
    if (store.get("twk-userData")) {
      logoutBtn = (
        <input
          type="submit"
          value="Logout"
          onClick={this.logout}
          className="btn btn-danger"
        />
      );
    }
    return (
      <div className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link to="/">
                  <div className="navbar-brand">TeamWork</div>
                </Link>

                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to="/feed">
                        <div className="nav-link" href="#">
                          Feed
                        </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/articles">
                        <div className="nav-link" href="#">
                          Articles
                        </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/gifs">
                        <div className="nav-link" href="#">
                          Gifs
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item">{logoutBtn}</li>
                  </ul>
                </div>
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/articles" component={Articles} />
              <Route exact path="/gifs" component={Gifs} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
