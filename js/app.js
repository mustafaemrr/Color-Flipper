const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const btn = document.getElementById('btn');
const color = document.querySelector('.color');
const fav = document.querySelector('#fav');
let alertContainer = document.querySelector('.alert-container');
let favListContainer = document.querySelector('#fav-list');

document.addEventListener('DOMContentLoaded', loadAllColors);

const showAlert = (type, message) => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alertContainer.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2000);
};

const addFav = (hexCode) => {
  let favItem = `
  <li class='d-flex justify-content-between align-items-center py-2'>
  <span>Renk Kodu: <span>${hexCode}</span></span>
  <span class='color-flipper__favori-list-color' style='background-color:${hexCode}'></span>
  </li>
  `;
  favListContainer.insertAdjacentHTML('beforeend', favItem);
};

const getColorsFromStorage = () => {
  let colors;

  if (localStorage.getItem('colors') === null) {
    colors = [];
  } else {
    colors = JSON.parse(localStorage.getItem('colors'));
  }
  return colors;
};

const addColorsToStorage = (newColors) => {
  let colors = getColorsFromStorage();
  colors.push(newColors);
  localStorage.setItem('colors', JSON.stringify(colors));
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * hex.length);
};

function loadAllColors() {
  let colors = getColorsFromStorage();
  colors.forEach(function (color) {
    addFav(color);
  });
};

btn.addEventListener('click', () => {
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  color.textContent = hexColor;
  btn.style.backgroundColor = hexColor;
  document.body.style.backgroundColor = hexColor;
});

fav.addEventListener('click', () => {
  showAlert('success', 'Renk favori listene eklendi.');
  addFav(color.textContent);
  addColorsToStorage(color.textContent);
});