let nextSongButton = document.getElementById("next");
let playSongButton = document.getElementById("play");
let previousSongButton = document.getElementById("previous");

let songInfo = document.getElementById("songInfo");
let volumeSlider = document.getElementById("volumeDisplay");
let displaySlider = document.getElementById("timeDisplay");
let songDuration = document.getElementById("currentTime")
let myPlace = document.getElementById("curr_time");

let player = document.createElement("audio");
let songNum = 0;
let songFlag = false;
let songList = [
{
    name:"Moog City",
    path:"Music/Moog_City.mp3"
},
{
    name:"Dancin",
    path:"Music/KRONO.mp3"
}
];

function resetValue(){
    displaySlider.value =0;
    songDuration.textContent="00:00";
}

function loadSong(songNum){
    resetValue();
    
player.src = songList[songNum].path;
player.load();
songInfo.textContent = songList[songNum].name;

}
 function playOrPause(){
     if (!songFlag)playSong();
     else pauseSong();
 }

 function playSong(){
player.play();
songFlag = true;
 }

 function pauseSong(){
player.pause();
songFlag = false;
 }
function nextSong(){
 if (songNum <songList.length-1){
    songNum= songNum +1;
 }
 else{
    songNum = 0;
 }
 loadSong(songNum);
 playSong();
}

function previousSong(){
if (songNum>0){
    songNum = songNum -1;
}
else{
    songNum = songList.length-1;
}
loadSong(songNum);
playSong();
}
function readProgress(){
let newProgress =0;
    if (!player.duration) return;   
newProgress = player.duration * (displaySlider.value/100);
player.currentTime = newProgress;
}
function volumeControl(){
 player.volume = volumeSlider.value/100;
}
function timeUP(){
  if (!player.duration) return;
let mypositionMin = Math.floor(player.currentTime/60);
 let mypositionSec = Math.floor(player.currentTime %60);

 let totalMin = Math.floor(player.duration/60);
 let totalSec = Math.floor(player.duration %60);

if (mypositionMin<10){mypositionMin= "0"+ mypositionMin;}
if(mypositionSec<10){mypositionSec = "0"+mypositionSec;}
if(totalMin<10){totalMin = "0"+ totalMin;}
if(totalSec<10){totalSec = "0"+totalSec;}

 myPlace.textContent = mypositionMin + ":" + mypositionSec;
 songDuration.textContent = totalMin +":" + totalSec;
}
function displayProgress(){
let progress = 0;
 if (!player.duration) return;
progress = player.currentTime *(100/player.duration);
displaySlider.value = progress;
}

playSongButton.addEventListener("click", playOrPause);
nextSongButton.addEventListener("click", nextSong);
previousSongButton.addEventListener("click", previousSong);

displaySlider.addEventListener("input", readProgress);
volumeSlider.addEventListener("input", volumeControl);

player.addEventListener("timeupdate", () => {
    timeUP();
    displayProgress();
});

player.addEventListener("loadedmetadata", timeUP);
player.addEventListener("ended", nextSong);
loadSong(songNum);
