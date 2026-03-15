fetch("pokedex.json")
.then(response => response.json())
.then(data => {

  const container = document.getElementById("dataSetDisplay");
  const searchBar = document.getElementById("searchBar");
  function displayPokemon(list){
  container.innerHTML = "";
  list.forEach(pokemon => {
  sum = pokemon.base.Attack + pokemon.base.Defense + pokemon.base.HP+ pokemon.base["Sp. Attack"] + pokemon.base["Sp. Defense"] + pokemon.base.Speed;
  const div = document.createElement("div");
 
  div.innerHTML = `
  
  <h3>#${pokemon.id} ${pokemon.name.english}</h3>
  <p>Type: ${pokemon.type.join(", ")}</p>
  <p>HP: ${pokemon.base.HP}</p>
  <p>Attack: ${pokemon.base.Attack}</p>
  <p>Defense: ${pokemon.base.Defense}</p>
  <p>Sp. Attack: ${pokemon.base["Sp. Attack"]}</p>
  <p>Sp. Defense: ${pokemon.base["Sp. Defense"]}</p>
  <p>Speed ${pokemon.base.Speed}</p>
  <p>BST ${sum}</p>
  <hr>
    `;

    container.appendChild(div);

    });
}

displayPokemon(data);
 searchBar.addEventListener("input", () => {

    const search = searchBar.value.toLowerCase();

    const filtered = data.filter(pokemon =>
      pokemon.name.english.toLowerCase().includes(search)
    );

    displayPokemon(filtered);

  });
});