document.addEventListener("DOMContentLoaded", async function() { /*Ansycnous loading with the json file and all the code waits for all the DOM to be loaded */
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); /* gets the Id number from the search bar which is the pokemon number */

    if (!id) {
        document.body.innerHTML = "No Pokémon ID provided in URL.";
        return;
    } /*Error handling for when the id in the search bar is not existing */

    const pokedex = await loadPokedex();
    if (!pokedex) {
        document.body.innerHTML = "Could not load pokedex.json";
        return;
    } /*Error handling for finding pokedex.json, if it could not be found at the correct file path */

    const pokemon = pokedex.find(p => String(p.id) === id);/* Finds the pokemon with the id as seen in the search url */
    if (!pokemon) {
        document.body.innerHTML = "No Pokémon found with this ID.";
        return;
    } /*Makes sure the id actually connects with a pokemon */

    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon)); /* gets last pokemon that was stored in local storage for reuse*/

    addPokemonInfo(pokemon); /*function that adds the data to the html page */

    async function loadPokedex() {  
        const pokemonStored = localStorage.getItem("pokedex");
        if (pokemonStored) {
            try { return JSON.parse(pokemonStored); }  /*Checks if mon is in storage, if it is, it turns it to javascript. If it cannot parse it the function will delete the corrupted data */
            catch { localStorage.removeItem("pokedex"); }
        }
        try {
            const pokedex = await fetch("pokedex.json"); /*If it is not in storage, it fetches it from the json */
            if (!pokedex.ok) throw new Error("Fetching JSON failed");
            const data = await pokedex.json();
            localStorage.setItem("pokedex", JSON.stringify(data)); /*adds the information from the Json back to the local storage */
            return data;
        } catch (err) {
            console.error(err); /*error handling */
            return null;
        }
    }

    function addPokemonInfo(pokemon) { /*adds all the data and creates the bar graphs  */
        const pokemonName = document.getElementById("pokemonNameAndNumber"); /*finds all the elements in the HTML that needs this infomation */
        const pokemonType = document.getElementById("pokemonType");
        const statsContainer = document.getElementById("statsContainer");
         const pokemonWeakness = document.getElementById("weakness");
          const pokemonHeight = document.getElementById("height");
           const pokemonWeight = document.getElementById("weight");
            const pokemonGen = document.getElementById("generation");
             const pokemonAbility = document.getElementById("ability");
              const pokemonEgg = document.getElementById("egg_group");
               const pokemonGender = document.getElementById("gender_ratio");
                const pokemonCatch = document.getElementById("catch_rate");

        if (pokemonName) pokemonName.textContent = "#" + pokemon.id + " " + (pokemon.name?.english || "Unknown");
        if (pokemonType) pokemonType.textContent = "Type: " + (pokemon.type?.join(", ") || "Unknown"); /*Both are error handlings, checks if pokemon name and type exists or else replaces it with null */

        if (statsContainer) {
            statsContainer.innerHTML = "";
            const pokemonStatsPath = pokemon.base || {}; // changes pokemon.base JSON path to more readable
            const statCategories = [
                ["HP", pokemonStatsPath.HP || 0],
                ["Attack", pokemonStatsPath.Attack || 0],
                ["Defense", pokemonStatsPath.Defense || 0],
                ["Sp. Attack", pokemonStatsPath["Sp. Attack"] || 0],
                ["Sp. Defense", pokemonStatsPath["Sp. Defense"] || 0],
                ["Speed", pokemonStatsPath.Speed || 0],
                ["BST", (pokemonStatsPath.HP || 0) + (pokemonStatsPath.Attack || 0) + (pokemonStatsPath.Defense || 0) + (pokemonStatsPath.Speed || 0) + (pokemonStatsPath["Sp. Attack"] || 0) + (pokemonStatsPath["Sp. Defense"] || 0)]
            ];

            statCategories.forEach(pokemonStat => { // for each stat creates a bar 
                const statDiv = document.createElement("div");
                statDiv.className = "statGraph";
                statDiv.innerHTML = `
<span class="statName">${pokemonStat[0]}</span>
<div class="barBackground">
  <div class="barFill" style="width:${pokemonStat[1]*2}px"></div>
</div>
<span class="statValue">${pokemonStat[1]}</span>`;
                statsContainer.appendChild(statDiv);
            });

        }
console.log("pokemon object:", pokemon);
console.log("formData:", pokemon.formData);
console.log("formData[0]:", pokemon.formData?.[0]);
console.log("weaknessTypes:", pokemon.formData?.[0]?.weaknessTypes);
console.log("height:", pokemon.formData?.[0]?.height);
console.log("weight:", pokemon.formData?.[0]?.weight);
        if(pokemonWeakness) pokemonWeakness.textContent="Weakness: " + (pokemon?.formData?.[0]?.weaknessTypes?.join(", ")|| "Unknown");
    if(pokemonHeight)pokemonHeight.textContent = "Height: " + (pokemon?.formData?.[0]?.height||"Unknown");
    if(pokemonWeight)pokemonWeight.textContent = "Weight: " + (pokemon?.formData?.[0]?.weight||"Unknown");
   if( pokemonGen) pokemonGen.textContent = "Generation that it first appeared: " + (pokemon?.generation||"Unknown");
    if(pokemonAbility)pokemonAbility.textContent="Possible Abilities: " + (pokemon?.profile?.ability?.join(", ")||"Unknown");
   if( pokemonEgg)pokemonEgg.textContent = "Egg Group: "+ (pokemon.profile?.egg||"Unknown");
    if(pokemonGender)pokemonGender.textContent = "Gender Ratio: "+ (pokemon?.profile?.gender||"Unknown");
    if(pokemonCatch)pokemonCatch.textContent= "Catch rate: " + (pokemon?.profile?.catchRate||"Unknown");
    }
});