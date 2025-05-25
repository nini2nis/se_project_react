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

  addNewItem({ name, weather, imageUrl }) {
    const token = localStorage.getItem("jwt");
    console.log("Token being used:", token);
    console.log("Full headers:", {
      ...postHeaders,
      Authorization: `Bearer ${token}`,
    });
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        ...postHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        weather,
        imageUrl,
      }),
    }).then(_checkResponse);
  },

  removeItem(_id, token) {
    return fetch(`${baseUrl}/items/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        postHeaders,
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
