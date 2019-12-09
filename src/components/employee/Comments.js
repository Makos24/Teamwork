import React from "react";
import { getData, PostDataAuth } from "../../service";
import store from "store";

const RESET_VALUES = {
  id: "",
  body: "",
  name: ""
};

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      comments: [],
      comment: ""
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  toggle() {
    if (!this.state.show) {
      if (this.props.post.body.search("http://res.cloudinary.com")) {
        getData("/gifs/" + this.props.post.id + "/comments").then(result => {
          let responseJson = result;
          if (responseJson.status === "success") {
            console.log(responseJson.data);
            this.setState({ comments: responseJson.data });
            //   this.setState({ redirectToReferrer: true });
          }
        });
      } else {
        getData("/articles/" + this.props.post.id + "/comments").then(
          result => {
            let responseJson = result;
            if (responseJson.status === "success") {
              console.log(responseJson.data);
              this.setState({ comments: responseJson.data });
              //   this.setState({ redirectToReferrer: true });
            }
          }
        );
      }
    }

    this.setState(currentState => ({ show: !currentState.show }));
  }

  getComments() {
    if (this.state.comments) {
      let commentsAsArray = Object.keys(this.state.comments).map(
        cid => this.state.comments[cid]
      );
      return commentsAsArray;
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addComment() {
    if (this.state.comment) {
      let comment = {
        id: new Date().getTime(),
        body: this.state.comment,
        name: store.get("twk-userData").name
      };
      PostDataAuth(
        "/articles/" + this.props.post.id + "/comments",
        comment
      ).then(result => {
        let responseJson = result;
        if (responseJson.status === "success") {
          console.log(responseJson.data);
          this.setState(prevState => {
            let comments = prevState.comments;
            comments[comment.id] = comment;
            return { comments };
          });
          this.setState({
            comment: Object.assign({}, RESET_VALUES)
          });
        }
      });
    }
  }

  render() {
    var rows = [];
    if (this.getComments()) {
      this.getComments().forEach(comment => {
        rows.push(
          <div key={comment.id} className="shadow-sm p-2 m-2 col-md-10">
            <h6>{comment.name}</h6>
            {comment.body}
          </div>
        );
      });
    }

    return (
      <div>
        <button onClick={this.toggle} className="btn btn-primary">
          {this.state.show ? "Hide" : "Show"} Comments
        </button>
        <div className="col-md-11 mt-3">
          {this.state.show && (
            <div>
              <div className="row">{rows}</div>
              <div className="row">
                <div className="col-md-10">
                  <textarea
                    name="comment"
                    onChange={this.onChange}
                    className="form-control"
                    value={this.state.comment.body}
                  ></textarea>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary" onClick={this.addComment}>
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Comments;
