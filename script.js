const music_progress = document.getElementById("music-progress");
const song = document.getElementById("song");
const control_icon = document.getElementById("control-icon");
const volume_icon = document.getElementById("volume-icon");


// Music Progress bar to do the following things:
// 1. Sync to the music and track along with it
// 2. Know the duration of the song for the progress bar to track accurately within its confines
song.onloadedmetadata = function(){
    music_progress.max = song.duration;             // Note: this line has to be above music_progress.value line else progress bar ends early before the song finishes
                                                    // If set below, max is defaulted at 100, thus, ending at 100secs of the song

    music_progress.value = song.currentTime;        // time in seconds (sec)
}

// Check whether on Play or Pause icon
function playPause(){
    if(control_icon.classList.contains("fa-pause")){      // Using id to check whether class has a specific word
        song.pause();                                     // pause song if Pause icon in-use
        
        // Now to switch from Pause icon to Play icon
        control_icon.classList.remove("fa-pause");
        control_icon.classList.add("fa-play");
    }
    else{
        song.play();

        // Now to switch from Play icon to Pause icon
        control_icon.classList.remove("fa-play");
        control_icon.classList.add("fa-pause");
    }
}

// To actuate Music Progress bar to move
if(song.play()){
    setInterval(()=>{
        music_progress.value = song.currentTime;     // Update the bar every 500ms, this is how we move it
    },500);
}

// Clicking anywhere on Music Progress bar to continue the song from new position
music_progress.onchange = function(){
    song.play();                                    // clicking anywhere on progress bar is the equivalent of Playing
    song.currentTime = music_progress.value;        // Update current song runtime based on the value of the progress bar to where it was clicked

    // Update the icons from Pause to Play
    control_icon.classList.remove("fa-play");
    control_icon.classList.add("fa-pause");
}


// Mute and Unmute function
volume_icon.addEventListener("click",()=>{
    song.muted = !song.muted;                      // flip the value with every click, between True (no sound) and False (have sound)

    // Update the icons
    if (song.muted) {
        volume_icon.className = "fa-solid fa-volume-xmark";
    }
    else{
        volume_icon.className = "fa-solid fa-volume-high";
    }
});
