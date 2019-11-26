import React from "react";
// import Filters from "../admin/Filters";
import store from "store";
import { Redirect } from "react-router-dom";
import Posts from "./Posts";
import { getData } from "../../service";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ""
    };

    // this.handleFilter = this.handleFilter.bind(this);
    // this.handleDestroy = this.handleDestroy.bind(this);
    // this.saveUser = this.saveUser.bind(this);
  }

  componentDidMount() {
    getData("/feed").then(result => {
      let responseJson = result;
      if (responseJson.status === "success") {
        console.log(responseJson.data);
        this.setState({ posts: responseJson.data });
        //   this.setState({ redirectToReferrer: true });
      }
    });
  }

  //   saveUser(user) {
  //     if (!user.id) {
  //       user.id = new Date().getTime();
  //     }
  //     this.setState(prevState => {
  //       let users = prevState.users;
  //       users[user.id] = user;
  //       return { users };
  //     });
  //   }
  //   handleDestroy(productId) {
  //     this.setState(prevState => {
  //       let users = prevState.users;
  //       delete users[productId];
  //       return { users };
  //     });
  //   }
  render() {
    if (!store.get("twk-userData")) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App container mt-5 mb-5">
        <div className="mt-5 mb-5"></div>
        <div className="container">
          <h1>Recent Posts</h1>
          <Posts
            posts={this.state.posts}
            onDestroy={this.handleDestroy}
          ></Posts>
          {/* <ProductForm onSave={this.saveProduct}></ProductForm> */}
        </div>
      </div>
    );
  }
}

export default Feed;
