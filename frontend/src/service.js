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

export function getData(type) {
  let BaseURL = "http://localhost:3008/api/v1";
  //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",

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
