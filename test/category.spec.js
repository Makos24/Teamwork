const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

let login_details = {
  email: "admin@mail.com",
  password: "password"
};

let cat = {
  name: "Post Title"
};

let cat_update = {
  name: "Post Title 2"
};

let catId;

let token = "";

describe("CRUD Categories", () => {
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

  describe("/Create a Category", () => {
    it("it should store a category to db ", done => {
      chai
        .request(app)
        .post("/api/v1/categories")
        .send(cat)
        // set the auth header with token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          //console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Category successfully posted"
          );
          expect(res.body.data).to.be.an("object");
          catId = res.body.data.categoryId;
          //res.body.data.should.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Get all categories", () => {
    it("it should get all categories ", done => {
      chai
        .request(app)
        .get("/api/v1/categories")
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

  describe("/Get category by ID", () => {
    it("it should get an category by ID ", done => {
      chai
        .request(app)
        .get("/api/v1/categories/" + catId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Update category by ID", () => {
    it("it should update a category by ID ", done => {
      chai
        .request(app)
        .put("/api/v1/categories/" + catId)
        .send(cat_update)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Category successfully updated"
          );
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Delete category by ID", () => {
    it("it should delete a category by ID ", done => {
      chai
        .request(app)
        .delete("/api/v1/categories/" + catId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals(
            "Category successfully deleted"
          );
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });
});
