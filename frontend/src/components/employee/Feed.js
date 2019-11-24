import React from "react";
// import Filters from "../admin/Filters";
import store from "store";
import { Redirect } from "react-router-dom";
import Posts from "./Posts";

var PRODUCTS = {
  "1": {
    id: 1,
    category: "Musical Instruments",
    email: "$459.99",
    stocked: true,
    title: "Clarinet"
  },
  "2": {
    id: 2,
    category: "Musical Instruments",
    email: "$5,000",
    stocked: true,
    title: "Harpsicord"
  },
  "3": {
    id: 3,
    category: "Musical Instruments",
    email: "$11,000",
    stocked: false,
    title: "Fortepiano"
  },
  "4": {
    id: 4,
    category: "Furniture",
    email: "$799",
    stocked: true,
    title: "Chaise Lounge"
  },
  "5": {
    id: 5,
    category: "Furniture",
    email: "$1,300",
    stocked: false,
    title: "Dining Table"
  },
  "6": {
    id: 6,
    category: "Furniture",
    email: "$100",
    stocked: true,
    title: "Bean Bag"
  }
};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: PRODUCTS
    };

    // this.handleFilter = this.handleFilter.bind(this);
    // this.handleDestroy = this.handleDestroy.bind(this);
    // this.saveUser = this.saveUser.bind(this);
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
      <div className="mt-5 mb-5">
          </div>
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
