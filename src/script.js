"use script";

const countriesContainer = document.querySelector(".countries");

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);

//     const language = [];
//     for (let x in data.languages) language.push(data.languages[x]);
//     const currency = [];
//     for (let x in data.currencies) currency.push(data.currencies[x].name);

//     const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flags.svg}" alt="${
//       data.flags.alt
//     }" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} millions</p>
//             <p class="country__row"><span>🗣️</span>${language[0]}</p>
//             <p class="country__row"><span>💰</span>${currency[0]}</p>
//         </div>
//      </article>
//     `;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData("portugal");
// getCountryData("usa");
// getCountryData("japan");
// getCountryData("germany");

// setTimeout(() => {
//   console.log(1);
//   setTimeout(() => {
//     console.log(2);
//     setTimeout(() => {
//       console.log(3);
//       setTimeout(() => {
//         console.log(4);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = fetch("https://restcountries.com/v3.1/name/japan");
// console.log(request);

const renderCountry = function (data, className = "") {
  const language = [];
  for (let x in data.languages) language.push(data.languages[x]);
  const currency = [];
  for (let x in data.currencies) currency.push(data.currencies[x].name);

  const html = `
    <article class="country ${className}">
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
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0], "neighbor"));
};
getCountryData("finland");
