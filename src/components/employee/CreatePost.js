import React from "react";
import { PostDataAuth } from "../../service";
import store from "store";

const RESET_VALUES = {
  category_id: "",
  title: "",
  body: "",
  name: ""
};

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      show: false,
      article: Object.assign({}, RESET_VALUES),
      errors: {}
    };
  }
  toggle() {
    this.setState(currentState => ({ show: !currentState.show }));
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => {
      prevState.article[name] = value;
      return { article: prevState.article };
    });
  }
  handleSave() {
    if (this.state.article) {
      let article = {
        title: this.state.article.title,
        body: this.state.article.body,
        category_id: 1
      };
      PostDataAuth("/articles/", article).then(result => {
        let responseJson = result;
        if (responseJson.status === "success") {
          console.log(responseJson.data);
          this.props.onSave(this.state.article);
          this.setState({
            article: Object.assign({}, RESET_VALUES)
          });
          this.toggle();
        }
      });
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle} className="btn btn-primary">
          {this.state.show ? "Close Create Post" : "Create Post"}
        </button>
        <div className="col-md-11 mt-3">
          {this.state.show && (
            <form className="form-vertical col-md-8">
              <h3>Create New Article</h3>
              <div className="form-group">
                <label className="control-label">Title</label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.article.title}
                />
              </div>
              <div className="form-group">
                <label>Body</label>

                <textarea
                  className="form-control"
                  type="text"
                  name="body"
                  onChange={this.handleChange}
                  value={this.state.article.body}
                ></textarea>
                <input type="hidden" value="1" name="category_id" />
              </div>

              <input
                type="button"
                className="btn btn-success"
                value="Save"
                onClick={this.handleSave}
              />
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default CreatePost;
