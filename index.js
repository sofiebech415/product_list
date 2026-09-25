const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const catListContainer = document.querySelector("#catListContainer");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    catListContainer.innerHTML += `<a href = "productlist.html?cat=${encodeURI(element.category)}"> ${element.category}</a>`;
  });
}
