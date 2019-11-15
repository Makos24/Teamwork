const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

let login_details = {
  email: "frank@team.com",
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

let articleId;

let token = "";

console.log(process.env);

describe("CRUD Articles", () => {
  beforeEach(done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send(login_details)
      .end((err, res) => {
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
