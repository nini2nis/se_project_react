const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.webmakers.ch"
    : "http://localhost:3001";
const postHeaders = {
  "Content-Type": "application/json",
};
const getHeaders = {
  Accept: "application/json",
};

export function _checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

const api = {
  getInitialItems() {
    return fetch(`${baseUrl}/items`, {
      method: "GET",
      headers: getHeaders,
    }).then(_checkResponse);
  },

  addNewItem({ name, imageUrl, weather }) {
    const token = localStorage.getItem("jwt");
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...postHeaders,
      },
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    }).then(_checkResponse);
  },

  removeItem(_id, token) {
    return fetch(`${baseUrl}/items/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        ...postHeaders,
      },
    }).then(_checkResponse);
  },

  addCardLike(_id, token) {
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "PUT",
      headers: {
        ...postHeaders,
        Authorization: `Bearer ${token}`,
      },
    }).then(_checkResponse);
  },

  removeCardLike(_id, token) {
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        ...postHeaders,
        Authorization: `Bearer ${token}`,
      },
    }).then(_checkResponse);
  },
};

export default api;
