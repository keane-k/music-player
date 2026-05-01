const music_progress = document.getElementById("music-progress");           // music progress bar
//const song = document.getElementById("song");                               // audio source from index.html
const control_icon = document.getElementById("control-icon");               // play pause button
const volume_icon = document.getElementById("volume-icon");                 // volume button

const song_image = document.getElementById("song-image");
const song_name = document.getElementById("song-name");
const song_artist = document.getElementById("song-artist");

const shuffle_song = document.getElementById("shuffle-song");
const previous_song = document.getElementById("previous-song");
const next_song = document.getElementById("next-song");
const repeat_song = document.getElementById("repeat-song");

const songs = [
    {
        image: "images/thumbnail1.jpg",
        name: "Journey",
        artist: "Destiny 2",
        audio: "songs/Destiny 2 - Journey (Vocal Variant 2).mp3"
    },
    {
        image: "images/Beyond Light.jpg",
        name: "Athanasia",
        artist: "Destiny 2: Beyond Light",
        audio: "songs/Destiny 2_ Beyond Light -  Athanasia.mp3",
    },
];


const audio = document.createElement('audio');
let current_song_index = 0;                         // Array starts from 0
updateSong();               // Without this, refreshing the page will show 'Song' & 'Artist' instead of actual song name and artist name 


// Music Progress bar to do the following things:
// 1. Sync to the music and track along with it
// 2. Know the duration of the song for the progress bar to track accurately within its confines
audio.onloadedmetadata = function(){
    music_progress.max = audio.duration;             // Note: this line has to be above music_progress.value line else progress bar ends early before the song finishes
                                                    // If set below, max is defaulted at 100, thus, ending at 100secs of the song

    music_progress.value = audio.currentTime;        // time in seconds (sec)
};

// Check whether on Play or Pause icon
function playPause(){
    if(control_icon.classList.contains("fa-pause")){      // Using id to check whether class has a specific word
        audio.pause();                                     // pause song if Pause icon in-use
        
        // Now to switch from Pause icon to Play icon
        control_icon.classList.remove("fa-pause");
        control_icon.classList.add("fa-play");
    }
    else{
        audio.play();

        // Now to switch from Play icon to Pause icon
        control_icon.classList.remove("fa-play");
        control_icon.classList.add("fa-pause");
    }
};

// To actuate Music Progress bar to move
if(audio.play()){
    setInterval(()=>{
        music_progress.value = audio.currentTime;     // Update the bar every 500ms, this is how we move it
    },500);
};

// Clicking anywhere on Music Progress bar to continue the song from new position
music_progress.onchange = function(){
    audio.play();                                    // clicking anywhere on progress bar is the equivalent of Playing
    audio.currentTime = music_progress.value;        // Update current song runtime based on the value of the progress bar to where it was clicked

    // Update the icons from Pause to Play
    control_icon.classList.remove("fa-play");
    control_icon.classList.add("fa-pause");
};


// Mute and Unmute function
volume_icon.addEventListener("click",()=>{
    audio.muted = !audio.muted;                      // flip the value with every click, between True (no sound) and False (have sound)

    // Update the icons
    if (audio.muted) {
        volume_icon.className = "fa-solid fa-volume-xmark";
    }
    else{
        volume_icon.className = "fa-solid fa-volume-high";
    }
});


// Previous Song button
previous_song.addEventListener("click", function(){
    // We want to avoid out-of-range situation, Javascript doesn't support negative indices
    if (current_song_index == 0){                   // We cannot go below 0
        return;
    }
    current_song_index--;                           // current_song_index minus 1, we go to previous song
    updateSong();
    
    audio.play();                                   // autoplay when going to previous song
    control_icon.classList.remove("fa-play");
    control_icon.classList.add("fa-pause");
    
});


// Next Song button
next_song.addEventListener("click",function(){
    // To avoid out-of-range situation
    if (current_song_index == songs.length-1){      // If we are already on the last index, this button will not do anything
        return;
    }
    current_song_index++;                           // current_song_index plus 1, we go to next song
    updateSong();
    
    audio.play();                                   // autoplay when going to next song
    control_icon.classList.remove("fa-play");
    control_icon.classList.add("fa-pause");
});


// Update current song, song name, song artist, song image based on current_song_index
function updateSong(){
    const song = songs[current_song_index];     // Give us the current song
    song_image.src = song.image;                // Grab image src from current song
    song_name.innerText = song.name;            // Give song name of current song
    song_artist.innerText = song.artist;        // Give artist name of current song
        
    audio.src = song.audio;                     // Provide audio source of current song
}

