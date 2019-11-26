import React from "react";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const value = e.target["value"];
    const name = e.target.name;
    this.props.onFilter({
      [name]: value
    });
  }
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          name="filterText"
          value={this.props.filterText}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Filters;
