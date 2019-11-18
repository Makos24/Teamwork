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

let gifId;

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
          //console.log(res.body);
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

  describe("/Get article by ID", () => {
    it("it should get an article by ID ", done => {
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
