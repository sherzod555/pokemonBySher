const $_ = function(selector, node = document){
  return node.querySelector(selector);
};

const $$_ = function(selector, node = document){
  return node.querySelectorAll(selector);
};


const ALL_CATEGORY_TAB = "ALL";
const categories = [];


// import { pokemons } from "./pokemons";
import { pokemons } from "./data.js";

const wrapperElement = $_(".wrapper");
const template = $_(".card_box_template").content;


const searchInput = $_(".search_input");
const categoryWrapper = $_(".category_wrapper");


const displayPokemons = function (pokemons) {
  const pokemonsFragment = document.createDocumentFragment();
  wrapperElement.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const wrapperClone = template.cloneNode(true);
  
    $_(".pokemon_name", wrapperClone).textContent = pokemon.name;
    $_(".pokemon_img", wrapperClone).src = pokemon.img;
    $_(".pokemon_height", wrapperClone).textContent = pokemon.height;
    $_(".pokemon_weight", wrapperClone).textContent = pokemon.weight;
    $_(".pokemon_type", wrapperClone).textContent = pokemon.type;
    $_(".pokemon_ability", wrapperClone).textContent = pokemon.candy;
    $_(".pokemon_bottom", wrapperClone).textContent = pokemon.weaknesses;
    pokemonsFragment.appendChild(wrapperClone);
  
  });

  wrapperElement.appendChild(pokemonsFragment);
};

displayPokemons(pokemons);

// 
const displayCategories = function (categories) {
  const categoryFragment = document.createDocumentFragment();
  const categoryTemplate = $_(".category_template").content;
  categories.forEach((category) => {
    const categoryItem = categoryTemplate.cloneNode(true);

    $_(".category_item", categoryTemplate).textContent = category;
    $_(".category_item", categoryTemplate).dataset.id = category;

    categoryFragment.appendChild(categoryItem);
  });

  categoryWrapper.appendChild(categoryFragment);
};

pokemons.forEach((pokemon) => {
  pokemon.type.forEach((category) => {
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
});

displayCategories(categories);

categoryWrapper.addEventListener("click", (evt) => {
  evt.preventDefault();
  let newSelect;
  if (evt.target.matches("li") && evt.target.dataset.id !== ALL_CATEGORY_TAB) {
    newSelect = pokemons.filter((pokemon) => {
      return pokemon.type.includes(evt.target.dataset.id);
    });
  } else if (
    evt.target.matches("li") &&
    evt.target.dataset.id === ALL_CATEGORY_TAB
  ) {
    newSelect = pokemons;
  }

  displayPokemons(newSelect);
});

searchInput.addEventListener("keyup", (evt) => {
  const inputValue = new RegExp(evt.target.value, `gi`);
  const newPokemons = pokemons.filter((pokemon) =>
    pokemon.name.match(inputValue)
  );

  displayPokemons(newPokemons);
});
