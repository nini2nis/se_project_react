const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

function _checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getInitialItems() {
  return fetch(`${baseUrl}/items`).then(_checkResponse);
}

function addNewItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(_checkResponse);
}

function removeItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: headers,
  }).then(_checkResponse);
}

export { _checkResponse, getInitialItems, addNewItem, removeItem };
