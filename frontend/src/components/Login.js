import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { PostData } from "../service";
import store from "store";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
      // redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  login() {
    if (this.state.email && this.state.password) {
      PostData("/auth/signin", this.state).then(result => {
        let responseJson = result;
        if (responseJson.status === "success") {
          store.set("twk-userData", responseJson.data);
          if (responseJson.data.role === 1) {
            this.props.history.push("/users");
          } else {
            this.props.history.push("/feed");
          }
          //   this.setState({ redirectToReferrer: true });
        }
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    if (store.get("twk-userData")) {
      return <Redirect to="/users" />;
    }
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <input
            type="submit"
            value="Login"
            onClick={this.login}
            className="btn btn-primary btn-block"
          />
        </div>
      </div>
    );
  }
}

export default Login;
