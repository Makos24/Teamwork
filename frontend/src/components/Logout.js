import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import store from "store";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout() {
    store.remove("twk-userData");
    this.props.history.push("/login");
  }

  render() {
    if (store.get("twk-userData")) {
      return (
        <input
          type="submit"
          value="Logout"
          onClick={this.logout}
          className="btn btn-danger"
        />
      );
    }
  }
}

export default Login;
