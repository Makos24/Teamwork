import React from "react";
import UserRow from "./UserRow.js";
import SortableColumnHeader from "./UserTableHeader.js";

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.sortByKeyAndOrder = this.sortByKeyAndOrder.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);

    this.state = {
      sort: {
        column: "name",
        direction: "desc"
      }
    };
  }
  sortByKeyAndOrder(objectA, objectB) {
    let isDesc = this.state.sort.direction === "desc" ? 1 : -1;
    let [a, b] = [
      objectA[this.state.sort.column],
      objectB[this.state.sort.column]
    ];
    // if (this.state.sort.column === "email") {
    //   [a, b] = [a, b].map(value =>
    //     parseFloat(value.replace(/[^\d\.]/g, ""), 10)
    //   );
    // }
    if (a > b) {
      return 1 * isDesc;
    }
    if (a < b) {
      return -1 * isDesc;
    }
    return 0;
  }
  sortUsers() {
    let usersAsArray = Object.keys(this.props.users).map(
      uid => this.props.users[uid]
    );
    return usersAsArray.sort(this.sortByKeyAndOrder);
  }
  handleDestroy(id) {
    this.props.onDestroy(id);
  }
  handleSort(column, direction) {
    this.setState({
      sort: {
        column: column,
        direction: direction
      }
    });
  }
  render() {
    var rows = [];
    this.sortUsers().forEach(user => {
      // if (user.name.indexOf(this.props.filterText) === -1) {
      //   return;
      // }
      rows.push(
        <UserRow
          user={user}
          key={user.id}
          onDestroy={this.handleDestroy}
        ></UserRow>
      );
    });

    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="name"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="email"
              ></SortableColumnHeader>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
