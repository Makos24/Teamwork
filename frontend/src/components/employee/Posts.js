import React from "react";
import Post from "./Post";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);

    this.state = {
      sort: {
        column: "name",
        direction: "desc"
      }
    };
  }

  handleDestroy(id) {
    this.props.onDestroy(id);
  }

  getPosts() {
    let postsAsArray = Object.keys(this.props.posts).map(
      pid => this.props.posts[pid]
    );
    return postsAsArray;
  }

  render() {
    var rows = [];
    this.getPosts().forEach(post => {
      rows.push(
        <Post post={post} key={post.id} onDestroy={this.handleDestroy}></Post>
      );
    });

    return <div className="row">{rows}</div>;
  }
}

export default Posts;
