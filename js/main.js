const $_ = function(selector, node = document){
  return node.querySelector(selector);
};

// import { pokemons } from "./pokemons";
import { pokemons } from "./data.js";

const wrapperElement = $_(".wrapper");
const template = $_(".card_box_template").content;

const pokemonFragment = document.createDocumentFragment();

pokemons.forEach((pokemon) => {
  const wrapperClone = template.cloneNode(true);

  $_(".pokemon_name", wrapperClone).textContent = pokemon.name;
  $_(".pokemon_img", wrapperClone).src = pokemon.img;
  $_(".pokemon_height", wrapperClone).textContent = pokemon.height;
  $_(".pokemon_weight", wrapperClone).textContent = pokemon.weight;
  $_(".pokemon_type", wrapperClone).textContent = pokemon.type;
  $_(".pokemon_ability", wrapperClone).textContent = pokemon.candy;
  $_(".pokemon_bottom", wrapperClone).textContent = pokemon.weaknesses;




  pokemonFragment.appendChild(wrapperClone);

});

wrapperElement.appendChild(pokemonFragment);

