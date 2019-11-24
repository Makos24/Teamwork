import React from "react";

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }
  destroy() {
    this.props.onDestroy(this.props.user.id);
  }
  render() {
    var name = this.props.user.name;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.user.email}</td>
        <td>
          <button onClick={this.destroy}>x</button>
        </td>
      </tr>
    );
  }
}

export default UserRow;
