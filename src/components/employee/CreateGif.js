import React from "react";
import { PostDataAuth } from "../../service";
import store from "store";

const RESET_VALUES = {
  title: ""
};

class GreateGif extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      show: false,
      image: null,
      gif: Object.assign({}, RESET_VALUES),
      errors: {}
    };
  }
  toggle() {
    this.setState(currentState => ({ show: !currentState.show }));
  }
  handleChanges(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => {
      prevState.gif[name] = value;
      return { gif: prevState.gif };
    });
  }
  handleChange(e) {
    this.setState({
      image: e.target.files[0]
    });
  }
  handleSave(e) {
    e.preventDefault();
    if (this.state.gif.title !== "" && this.state.image) {
      let data = new FormData();
      data.append("image", this.state.image, this.state.image.name);
      data.append("title", this.state.gif.title);

      console.log(data);
      PostDataAuth("/gifs/", data).then(result => {
        let responseJson = result;
        if (responseJson.status === "success") {
          console.log(responseJson.data);
          this.props.onSave(this.state.gif);
          this.setState({
            gif: Object.assign({}, RESET_VALUES)
          });
          this.toggle();
        }
      });
    } else {
      alert("All fields are required");
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle} className="btn btn-primary">
          {this.state.show ? "Close Upload" : "Upload Image"}
        </button>
        <div className="col-md-11 mt-3">
          {this.state.show && (
            <form className="form-vertical col-md-8">
              <h3>Upload New Image</h3>
              <div className="form-group">
                <label className="control-label">Title</label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={this.handleChanges}
                  value={this.state.gif.title}
                />
              </div>
              <div className="form-group">
                <label>Image</label>

                <input
                  className="form-control"
                  type="file"
                  name="image"
                  onChange={this.handleChange}
                />
              </div>

              <input
                type="submit"
                className="btn btn-success"
                value="Upload"
                onClick={this.handleSave}
              />
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default GreateGif;
