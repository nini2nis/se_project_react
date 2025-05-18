export const baseUrl = "http://localhost:3001";
const postHeaders = {
  "Content-Type": "application/json",
};

function _checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(_checkResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify({ email, password }),
  })
    .then(_checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};

export const changeProfile = (data, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...postHeaders,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: data.name, avatar: data.avatar }),
  }).then(_checkResponse);
};
