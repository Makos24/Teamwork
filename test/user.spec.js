const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

let login_details = {
  email: "admin@mail.com",
  password: "password"
};

let no = Math.floor(Math.random() * 100 + 1);
let user = {
  name: "Mason Frank",
  email: "frank" + no + "@team.com",
  password: "password",
  role: 2
};

let user_update = {
  name: "Mason G. Frank",
  email: "frankm" + no + "@team.com"
};

let token = "";
let userId;

describe("CRUD Users", () => {
  beforeEach(done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(login_details)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.data).to.have.property("token");
        expect(res.body.data.role).to.equals(1);

        token = res.body.data.token;

        done();
      });
  });

  describe("/Add User Account", () => {
    it("it should create a user account", done => {
      chai
        .request(app)
        .post("/api/v1/auth/create-user")
        .send(user)
        // set the auth header with token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals("User successfully created");
          expect(res.body.data).to.be.an("object");
          userId = res.body.data.userId;
          //res.body.data.should.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Get all users", () => {
    it("it should get all users ", done => {
      chai
        .request(app)
        .get("/api/v1/users")
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

  describe("/Get user by ID", () => {
    it("it should get a user by ID ", done => {
      chai
        .request(app)
        .get("/api/v1/users/" + userId)
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

  describe("/Update user by ID", () => {
    it("it should update a user by ID ", done => {
      chai
        .request(app)
        .put("/api/v1/users/" + userId)
        .send(user_update)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals("User successfully updated");
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });

  describe("/Delete user by ID", () => {
    it("it should delete a user by ID ", done => {
      chai
        .request(app)
        .delete("/api/v1/users/" + userId)
        // we set the auth header with our token
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equals("success");
          expect(res.body.data.message).to.equals("User successfully deleted");
          expect(res.body.data).to.be.an("object");

          done(); // Don't forget the done callback to indicate we're done!
        });
    });
  });
});
