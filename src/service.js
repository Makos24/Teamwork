import store from "store";

export function PostData(type, userData) {
  let BaseURL = "http://localhost:3008/api/v1";
  //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function PostDataAuth(type, userData) {
  let BaseURL = "http://localhost:3008/api/v1";
  const bearer = "Bearer " + store.get("twk-userData").token;
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",
      body: JSON.stringify(userData),
      mode: "cors",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getData(type) {
  let BaseURL = "http://localhost:3008/api/v1";
  const bearer = "Bearer " + store.get("twk-userData").token;
  //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
