// https://openapi.programming-hero.com/api/phones?search=${searchText}
const searchBox = () => {
  const searchBox = document.getElementById("search-box").value;
  loadPhones(searchBox.toLowerCase());
};
const loadPhones = (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};
