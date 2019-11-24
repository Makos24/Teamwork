import React from "react";
import Filters from "./Filters.js";
import UserTable from "./UserTable.js";
import store from "store";
import { Redirect } from "react-router-dom";
// import ProductForm from "./ProductForm";

var PRODUCTS = {
  "1": {
    id: 1,
    category: "Musical Instruments",
    email: "$459.99",
    stocked: true,
    name: "Clarinet"
  },
  "2": {
    id: 2,
    category: "Musical Instruments",
    email: "$5,000",
    stocked: true,
    name: "Harpsicord"
  },
  "3": {
    id: 3,
    category: "Musical Instruments",
    email: "$11,000",
    stocked: false,
    name: "Fortepiano"
  },
  "4": {
    id: 4,
    category: "Furniture",
    email: "$799",
    stocked: true,
    name: "Chaise Lounge"
  },
  "5": {
    id: 5,
    category: "Furniture",
    email: "$1,300",
    stocked: false,
    name: "Dining Table"
  },
  "6": {
    id: 6,
    category: "Furniture",
    email: "$100",
    stocked: true,
    name: "Bean Bag"
  }
};

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      users: PRODUCTS
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }
  handleFilter(filterInput) {
    this.setState(filterInput);
  }
  saveUser(user) {
    if (!user.id) {
      user.id = new Date().getTime();
    }
    this.setState(prevState => {
      let users = prevState.users;
      users[user.id] = user;
      return { users };
    });
  }
  handleDestroy(productId) {
    this.setState(prevState => {
      let users = prevState.users;
      delete users[productId];
      return { users };
    });
  }
  render() {
    if (!store.get("twk-userData") || store.get("twk-userData").role !== 1) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid mt-5">
        <Filters
          filterText={this.state.filterText}
          onFilter={this.handleFilter}
        ></Filters>
        <UserTable
          users={this.state.users}
          filterText={this.state.filterText}
          onDestroy={this.handleDestroy}
        ></UserTable>
        {/* <ProductForm onSave={this.saveProduct}></ProductForm> */}
      </div>
    );
  }
}

export default Users;
