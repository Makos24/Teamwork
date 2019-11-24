import React from "react";

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
          <div className="card-body">
            <h5 className="card-title">{this.props.post.title}</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
