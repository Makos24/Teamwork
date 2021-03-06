const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

let login_details = {
  email: "test@mail.com",
  password: "password"
};

let article = {
  title: "Post Title",
  body: "Testing create articles with mocha",
  category_id: 1
};

let article2 = {
  title: "Post Title 2",
  body: "Testing create articles with mocha 2",
  category_id: 1
};

let comment = {
  body: "test comment"
};

let comment2 = {
  body: "update comment"
};

let articleId;
let commentId;

let token = "";

describe("CRUD Articles", () => {
  beforeEach(done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(login_details)
      .end((err, res) => {
        //console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.data).to.have.property("token");

        token = res.body.data.token;

        done();
      });
  });

  describe("/Create an article", () => {
    it("it should store an article to db ", done => {
      chai
        .request(app)
        .post("/api/v1/articles")
        .send(article)
        // set the auth header with token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          //console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Article successfully posted"
          );
          expect(res.body.data).to.be.an("object");
          articleId = res.body.data.articleId;
          //res.body.data.should.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Get all articles", () => {
    it("it should get all articles ", done => {
      chai
        .request(app)
        .get("/api/v1/articles")
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          expect(res.body.data).to.be.an("array");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Get article by ID", () => {
    it("it should get an article by ID ", done => {
      chai
        .request(app)
        .get("/api/v1/articles/" + articleId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Update article by ID", () => {
    it("it should update an article by ID ", done => {
      chai
        .request(app)
        .put("/api/v1/articles/" + articleId)
        .send(article2)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Article successfully updated"
          );
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Comment on an Article", () => {
    it("it should store a comment to db ", done => {
      chai
        .request(app)
        .post("/api/v1/articles/" + articleId + "/comments")
        .send(comment)
        // set the auth header with token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Comment successfully posted"
          );
          expect(res.body.data).to.be.an("object");
          commentId = res.body.data.commentId;
          //res.body.data.should.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Get all commets for an article", () => {
    it("it should get all comments for an article ", done => {
      chai
        .request(app)
        .get("/api/v1/articles/" + articleId + "/comments")
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          expect(res.body.data).to.be.an("array");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Update comment by ID", () => {
    it("it should update an article by ID ", done => {
      chai
        .request(app)
        .put("/api/v1/comments/" + commentId)
        .send(comment2)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Comment successfully updated"
          );
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Delete comment by ID", () => {
    it("it should delete an comment by ID ", done => {
      chai
        .request(app)
        .delete("/api/v1/comments/" + commentId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Comment successfully deleted"
          );
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Delete article by ID", () => {
    it("it should delete an article by ID ", done => {
      chai
        .request(app)
        .delete("/api/v1/articles/" + articleId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Article successfully deleted"
          );
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });
});
