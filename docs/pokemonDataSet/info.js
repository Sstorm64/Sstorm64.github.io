const params = new URLSearchParams(window.location.search);
const id = params.get("id"); /*gets the id from the url and finds the pokemon attached to it */
fetch("pokedex.json")
    .then(res => res.json())
    .then(data => {
        const pokemon = data.find(p => p.id == id); /*returns the pokemon name that matches the id */
        document.getElementById("pokemonNameAndNumber").textContent = "#" + pokemon.id + " " + pokemon.name.english;

        document.getElementById("pokemonSprite").src =
            "img/" + pokemon.id + ".png";

        document.getElementById("pokemonType").textContent = "Type: " +
            pokemon.type.join(", ");

        /*Below is the code generating the graphs */

        const pokemonStats = pokemon.base;
        const statCatagories = [
            ["HP", pokemonStats.HP],
            ["Attack", pokemonStats.Attack],
            ["Defense", pokemonStats.Defense],
            ["Sp. Attack", pokemonStats["Sp. Attack"]],
            ["Sp. Defense", pokemonStats["Sp. Defense"]],
            ["Speed", pokemonStats.Speed],
            ["BST",(pokemonStats.HP +pokemonStats.Attack+pokemonStats.Defense+pokemonStats.Speed+pokemonStats["Sp. Attack"]+pokemonStats["Sp. Defense"])]
        ];
        const pokemonStatGraph = document.getElementById("statsContainer")
        statCatagories.forEach(stat => {
            let pokemonStatEntry = document.createElement("div")
            pokemonStatEntry.className = "statGraph"
            pokemonStatEntry.innerHTML = `
<span class="statName">${stat[0]}</span>

<div class="barBackground">
<div class="barFill" style="width:${stat[1]}px"></div>
</div>

<span class="statValue">${stat[1]}</span>
`;
            pokemonStatGraph.appendChild(pokemonStatEntry)
        });
    });