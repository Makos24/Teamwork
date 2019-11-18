const { db } = require("./db");

db.none(
  "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email text UNIQUE NOT NULL, password text NOT NULL, role integer NOT NULL, created_at timestamp default current_timestamp)"
)
  .then(data => {
    console.log("successfully created users table");

    db.none(
      "CREATE TABLE IF NOT EXISTS categories(id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at timestamp default current_timestamp)"
    )
      .then(data => {
        console.log("successfully created categories table");
        db.none(
          "CREATE TABLE IF NOT EXISTS articles(id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, body text NOT NULL, user_id INTEGER REFERENCES users(id), category_id INTEGER REFERENCES categories(id), created_at timestamp default current_timestamp)"
        )
          .then(data => {
            console.log("successfully created articles table");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

    db.none(
      "CREATE TABLE IF NOT EXISTS gifs(id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, image_url text NOT NULL, user_id INTEGER REFERENCES users(id), created_at timestamp default current_timestamp)"
    )
      .then(data => {
        console.log("successfully created gifs table");
      })
      .catch(error => {
        console.log(error);
      });

    db.none(
      "CREATE TABLE IF NOT EXISTS comments(id SERIAL PRIMARY KEY, body text NOT NULL, post_id INTEGER NOT NULL, post_type INTEGER NOT NULL, user_id INTEGER REFERENCES users(id), flag BOOLEAN default false, created_at timestamp default current_timestamp)"
    )
      .then(data => {
        console.log("successfully created comments table");
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });
