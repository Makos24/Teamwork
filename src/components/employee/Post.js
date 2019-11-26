import React from "react";
import Comments from "./Comments";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }
  destroy() {
    this.props.onDestroy(this.props.post.id);
  }
  render() {
    return (
      <div className="col-md-10">
        <div className="card">
          <h4 className="shadow-sm p-3 m-2">{this.props.post.name}</h4>
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
