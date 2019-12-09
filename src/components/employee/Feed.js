import React from "react";
// import Filters from "../admin/Filters";
import store from "store";
import { Redirect } from "react-router-dom";
import Posts from "./Posts";
import { getData } from "../../service";
import CreatePost from "./CreatePost";
import CreateGif from "./CreateGif";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ""
    };

    // this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  componentDidMount() {
    getData("/feed").then(result => {
      let responseJson = result;
      if (responseJson.status === "success") {
        //console.log(responseJson.data);
        this.setState({ posts: responseJson.data });
        //   this.setState({ redirectToReferrer: true });
      }
    });
  }

  saveArticle(article) {
    if (!article.id) {
      article.id = new Date().getTime();
      article.name = store.get("twk-userData").name;
    }
    this.setState(prevState => {
      let posts = prevState.posts;
      posts[article.id] = article;
      return { posts };
    });
  }
  handleDestroy(postId) {
    this.setState(prevState => {
      let posts = prevState.posts;
      delete posts[postId];
      return { posts };
    });
  }
  render() {
    if (!store.get("twk-userData")) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="App container mt-5 mb-5">
        <div className="mt-5 mb-5"></div>
        <div className="container">
          <h1>Recent Posts</h1>

          <CreatePost onSave={this.saveArticle}></CreatePost>

          <CreateGif onSave={this.saveArticle}></CreateGif>

          <Posts
            posts={this.state.posts}
            onDestroy={this.handleDestroy}
          ></Posts>
          {/* <ProductForm onSave={this.saveProduct}></ProductForm> */}
        </div>
      </div>
    );
  }
}

export default Feed;
