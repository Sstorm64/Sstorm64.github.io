document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let pokemon = JSON.parse(localStorage.getItem("selectedPokemon"));

    if (!pokemon || pokemon.id != id) {
        const pokedex = await loadPokedex();
        if (pokedex) {
            pokemon = pokedex.find(p => p.id == id);
        }
    }

    if (!pokemon) {
        document.body.innerHTML = "No Pokémon data found.";
        return;
    }

    document.getElementById("pokemonNameAndNumber").textContent =
        "#" + pokemon.id + " " + pokemon.name.english;

    document.getElementById("pokemonSprite").src =
        "img/" + pokemon.id + ".png";

    document.getElementById("pokemonType").textContent =
        "Type: " + pokemon.type.join(", ");

    const pokemonStats = pokemon.base;
    const statCategories = [
        ["HP", pokemonStats.HP],
        ["Attack", pokemonStats.Attack],
        ["Defense", pokemonStats.Defense],
        ["Sp. Attack", pokemonStats["Sp. Attack"]],
        ["Sp. Defense", pokemonStats["Sp. Defense"]],
        ["Speed", pokemonStats.Speed],
        ["BST", (
            pokemonStats.HP +
            pokemonStats.Attack +
            pokemonStats.Defense +
            pokemonStats.Speed +
            pokemonStats["Sp. Attack"] +
            pokemonStats["Sp. Defense"]
        )]
    ];

    const pokemonStatGraph = document.getElementById("statsContainer");
    statCategories.forEach(stat => {
        const pokemonStatEntry = document.createElement("div");
        pokemonStatEntry.className = "statGraph";

        pokemonStatEntry.innerHTML = `
<span class="statName">${stat[0]}</span>
<div class="barBackground">
  <div class="barFill" style="width:${stat[1]*2}px"></div>
</div>
<span class="statValue">${stat[1]}</span>
        `;
        pokemonStatGraph.appendChild(pokemonStatEntry);
    });

    // Helper function to load pokedex
    async function loadPokedex() {
        const stored = localStorage.getItem("pokedex");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                localStorage.removeItem("pokedex");
            }
        }
        try {
            const res = await fetch("pokedex.json");
            if (!res.ok) throw new Error("Fetching JSON failed");
            const data = await res.json();
            localStorage.setItem("pokedex", JSON.stringify(data));
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
});