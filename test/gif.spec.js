const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const { expect } = chai;

chai.use(chaiHttp);

let login_details = {
  email: "test@mail.com",
  password: "password"
};

let comment = {
  body: "test comment"
};

let comment2 = {
  body: "update comment"
};

let gifId;
let commentId;

let token = "";

describe("CRUD Gifs", () => {
  beforeEach(done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
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

  describe("/Upload a Gif", () => {
    it("it should upload a gif", done => {
      chai
        .request(app)
        .post("/api/v1/gifs")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("Authorization", "Bearer " + token)
        .field("title", "card")
        .attach(
          "image",
          fs.readFileSync(`${__dirname}/uploads/card.png`),
          "card.png"
        )
        // set the auth header with token
        .end((err, res) => {
          //   console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals("Gif successfully uploaded");
          expect(res.body.data).to.be.an("object");
          gifId = res.body.data.gifId;
          //res.body.data.should.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Get all gifs", () => {
    it("it should get all gifs ", done => {
      chai
        .request(app)
        .get("/api/v1/gifs")
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

  describe("/Get Gif by ID", () => {
    it("it should get a Gif by ID ", done => {
      chai
        .request(app)
        .get("/api/v1/gifs/" + gifId)
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

  describe("/Comment on an Gif", () => {
    it("it should store a comment to db ", done => {
      chai
        .request(app)
        .post("/api/v1/articles/" + gifId + "/comments")
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

  describe("/Get all comments for a Gif", () => {
    it("it should get all comments for a gif ", done => {
      chai
        .request(app)
        .get("/api/v1/articles/" + gifId + "/comments")
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
    it("it should update a comment by ID ", done => {
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

  describe("/Delete gif by ID", () => {
    it("it should delete a gif by ID ", done => {
      chai
        .request(app)
        .delete("/api/v1/gifs/" + gifId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals("Gif successfully deleted");
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });
});
