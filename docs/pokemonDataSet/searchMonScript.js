fetch("pokedex.json") /*takes all the data from pokdex.json file, converts it to an array that can be easily parsed*/
    .then(res => res.json())
    .then(data => {
        const pokdexListContainer = document.getElementById("pokemonList") /*connects the pokemonList element to a list/array/box that we could add stuff to */
        data.forEach(pokemon => {
            let pokemonEntry = document.createElement("div") /*Creates a div that is a class called PokemonEntry it contains the entries of the pokemon from the JSON*/
            pokemonEntry.className = "pokemonEntry" /*adds the class to the said div as pokemon Entry */
            pokemonEntry.innerHTML = `#${pokemon.id} 
<a href ="info.html?id=${pokemon.id}">
    ${pokemon.name.english}
</a>
`; /*adds the actual info into the newly created pokemon Entry, the Div class we just created  */
            pokdexListContainer.appendChild(pokemonEntry);
        });
        document.getElementById("search").addEventListener("input", function() {
            /*checks search bar element as checks it everytime something is added or removed then sends the value to UserInput*/
            let userInput = this.value.toLowerCase()

            let pokemonList = document.querySelectorAll(".pokemonEntry")
            pokemonList.forEach(Entry => { /*Scans the list of pokemon and puts each one into the Entry varible which is then further used */
                if (Entry.textContent.toLowerCase().includes(userInput)) {
                    /*checks if what the user inputted is included in the pokemon's name, then displays similar entries or displays nothing */
                    Entry.style.display = "";
                } else {
                    Entry.style.display = "none";
                }
            });
        });

    });