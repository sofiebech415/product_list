const cat = new URLSearchParams(window.location.search).get("cat");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

const produktliste = document.querySelector("section");

document.querySelectorAll("#filtre button").forEach((knap) => addEventListener("click", filtrer));
const visantal = document.querySelector("#filtre span");

function filtrer(e) {
  const valgt = e.target.textContent;
  if (valgt == "Alle") {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((produkt) => produkt.gender == valgt);
  }
  console.log(udsnit);
  visData(udsnit);
}

let alleData, udsnit;

const h2 = document.querySelector("h2");
h2.textContent = cat;

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit = data;
    visData(data);
  });

function visData(json) {
  visantal.textContent = json.length;
  produktliste.innerHTML = "";
  json.forEach((produkt) => {
    const tilbudspris = Math.round(produkt.price - (produkt.price * produkt.discount) / 100);

    produktliste.innerHTML += `
    <a href=productdetails.html?id=${produkt.id} class=${produkt.soldout ? "udsolgt" : ""}>
<article class="card">

<img src = https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp>
  <h2>${produkt.gender}</h2>
  <h3>${produkt.brandname}</h3>
  ${produkt.discount ? "<p class='tilbudslabel'>Tilbud</p>" : `<p>kr. ${produkt.price}, - </p>`}
  <p>${produkt.price}</p>
  <p>${produkt.subcategory}</p>
  </article>`;
  });
}
