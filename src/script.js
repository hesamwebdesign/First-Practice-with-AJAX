"use script";

const countriesContainer = document.querySelector(".countries");

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    const language = [];
    for (let x in data.languages) language.push(data.languages[x]);
    const currency = [];
    for (let x in data.currencies) currency.push(data.currencies[x].name);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" alt="${
      data.flags.alt
    }" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} millions</p>
            <p class="country__row"><span>🗣️</span>${language[0]}</p>
            <p class="country__row"><span>💰</span>${currency[0]}</p>
        </div>
     </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData("portugal");
getCountryData("usa");
