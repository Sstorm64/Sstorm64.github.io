fetch("pokedex.json")
    .then(res => res.json())
    .then(data => {
const container = document.getElementById("pokemonList")
data.forEach(pokemon=>{
let row = document.createElement("div")
row.className = "pokemonRow"
row.innerHTML =`#${pokemon.id}
<img src="img/${pokemon.id}.png">
<a href ="info.html?id=${pokemon.id}">
    ${pokemon.name.english}
</a>
`;
container.appendChild(row);
});
    document.getElementById("search").addEventListener("input",function(){
    let filter = this.value.toLowerCase()
  
    let rows = document.querySelectorAll(".pokemonRow")
    rows.forEach(row=>{
if(row.textContent.toLowerCase().includes(filter)){
    row.style.display="";
}
else{
    row.style.display="none";
}
    });
      });

});