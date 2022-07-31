const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = '#';
    pokemonName.innerHTML = 'loading...';
    pokemonImage.alt = '';
    
    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
        pokemonImage.alt = 'Pokémon';
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonNumber.innerHTML = '#';
        pokemonName.innerHTML = 'missingno';
        pokemonImage.src = 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png';
        pokemonImage.alt = 'Pokémon Missingno';
    }
    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon >1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);