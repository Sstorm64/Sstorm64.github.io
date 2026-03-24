let nextSongButton = document.getElementById("next");
let playSongButton = document.getElementById("play");
let previousSongButton = document.getElementById("previous");

let songInfo = document.getElementById("songInfo");
let volumeSlider = document.getElementById("volumeDisplay");
let displaySlider = document.getElementById("timeDisplay");

let player = document.createElement("audio");
let trackList = [
{
    name:"name1",
    path:"/path/..."
},
{
    name:"name2",
    path:"/path2/..."
}
];
