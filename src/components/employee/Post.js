import React from "react";
import Comments from "./Comments";
import { Delete } from "../../service";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }
  destroy() {
    if (window.confirm("Are you sure you want to delete this article?")) {
      Delete("/articles/" + this.props.post.id).then(result => {
        let responseJson = result;
        if (responseJson.status === "success") {
          //console.log(responseJson.data);
          this.props.onDestroy(this.props.post.id);
        }
      });
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <div className="card">
          <div className="d-flex">
            <h4 className="shadow-sm m-2 flex-grow-1">
              {this.props.post.name}
            </h4>{" "}
            <button className="btn btn-sm btn-info">Edit</button>
            <button className="btn btn-sm btn-danger" onClick={this.destroy}>
              Delete
            </button>
          </div>

          <div className="card-body">
            <h5 className="card-title">{this.props.post.title}</h5>
            {this.props.post.body.search("http://res.cloudinary.com") ? (
              <p className="card-text">{this.props.post.body}</p>
            ) : (
              <img
                className="img-fluid img-thumbnail"
                src={this.props.post.body}
                alt={this.props.post.title}
              />
            )}

            <div className="">
              <Comments
                key={this.props.post.id}
                post={this.props.post}
              ></Comments>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
