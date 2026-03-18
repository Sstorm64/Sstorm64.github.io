document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.body.innerHTML = "No Pokémon ID provided in URL.";
        return;
    }

    const pokedex = await loadPokedex();
    if (!pokedex) {
        document.body.innerHTML = "Could not load pokedex.";
        return;
    }

    const pokemon = pokedex.find(p => String(p.id) === id);
    if (!pokemon) {
        document.body.innerHTML = "No Pokémon found with this ID.";
        return;
    }

    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));

    populatePokemon(pokemon);

    async function loadPokedex() {
        const stored = localStorage.getItem("pokedex");
        if (stored) {
            try { return JSON.parse(stored); } 
            catch { localStorage.removeItem("pokedex"); }
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

    function populatePokemon(pokemon) {
        const nameEl = document.getElementById("pokemonNameAndNumber");
        const spriteEl = document.getElementById("pokemonSprite");
        const typeEl = document.getElementById("pokemonType");
        const statsContainer = document.getElementById("statsContainer");

        if (nameEl) nameEl.textContent = "#" + pokemon.id + " " + (pokemon.name?.english || "Unknown");
        if (spriteEl) spriteEl.src = "img/" + pokemon.id + ".png";
        if (typeEl) typeEl.textContent = "Type: " + (pokemon.type?.join(", ") || "Unknown");

        if (statsContainer) {
            statsContainer.innerHTML = "";
            const stats = pokemon.base || {};
            const statCategories = [
                ["HP", stats.HP || 0],
                ["Attack", stats.Attack || 0],
                ["Defense", stats.Defense || 0],
                ["Sp. Attack", stats["Sp. Attack"] || 0],
                ["Sp. Defense", stats["Sp. Defense"] || 0],
                ["Speed", stats.Speed || 0],
                ["BST", (stats.HP || 0) + (stats.Attack || 0) + (stats.Defense || 0) + (stats.Speed || 0) + (stats["Sp. Attack"] || 0) + (stats["Sp. Defense"] || 0)]
            ];

            statCategories.forEach(stat => {
                const statDiv = document.createElement("div");
                statDiv.className = "statGraph";
                statDiv.innerHTML = `
<span class="statName">${stat[0]}</span>
<div class="barBackground">
  <div class="barFill" style="width:${stat[1]*2}px"></div>
</div>
<span class="statValue">${stat[1]}</span>`;
                statsContainer.appendChild(statDiv);
            });
        }
    }
});