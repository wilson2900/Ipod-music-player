const image = document.querySelector('img');
const title =  document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl =  document.getElementById('current-time');
const durationEl =  document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        title: 'Avril 14th',
        name: 'img1',
        displayName: 'Avril 14th',
        artist: 'Aphex Twin'
    },
    {
        title: 'Life of the party',
        name: 'img2',
        displayName: 'Life of the party',
        artist: 'Kanye West',
    },
    {
        title: 'Gimme Shelter',
        name: 'img3',
        displayName: 'Gimme Shelter',
        artist: 'Nirvana',
    },
    {
        title: 'Outkast',
        name: 'img4',
        displayName: 'Pink & Blue',
        artist: 'Outkast',
    },
    {
        title: 'Jukebox Joints',
        name: 'jukebox',
        displayName: 'Jukebox Joints',
        artist: 'A$AP Rocky',
    },
    {
        title: 'Dark night',
        name: 'dark night',
        displayName: 'Dark Knight',
        artist: 'The Blasters',
    },
    {
        title: 'Electric Feel',
        name: 'mgmt',
        displayName: 'Electric Feel',
        artist: 'MGMT',
    },
    {
        title: 'donda',
        name: 'donda',
        displayName: 'Believe What I Say',
        artist: 'Kanye West',
    },
    {
        title: 'Santana',
        name: 'santana',
        displayName: 'Black Magic Women',
        artist: 'Santana',
    },
    {
        title: 'The Brothers Johnson',
        name: 'strawberry',
        displayName: 'Strawberry Letter 23',
        artist: 'The Brothers Johnson',
    },
    {
        title: 'jesus',
        name: 'jik',
        displayName: 'Father Stretch',
        artist: 'Sunday Service Choir',
    },
    {
        title: 'prince',
        name: 'prince',
        displayName: 'When Doves Cry',
        artist: 'Prince',
    },
    {
        title: 'Metallica',
        name: 'metalica',
        displayName: 'The Day That Never Comes',
        artist: 'Metallica',
    },
    {
        title: 'Stronger',
        name: 'stronger',
        displayName: 'Stronger',
        artist: 'Kanye West',
    },
    {
        title: 'drake',
        name: 'drake',
        displayName: 'Pound Cake/ Paris Morton Music 2',
        artist: 'Drake',
    },
    {
        title: 'Neon Guts',
        name: 'uzi',
        displayName: 'Neon Guts',
        artist: 'Lil Uzi Vert',
    },
    {
        title: 'Solid Ground',
        name: 'solid',
        displayName: 'Solid Ground',
        artist: 'Micheal Kiwanuka',
    },
]

// Checl if playing
let isPlaying = false;


// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// pause 
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// Play or pause event listner

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.title}.mp3`;
    image.src = `img/${song.name}.webp`;
}

// current song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
};


// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
};

// On Load - select first song
loadSong(songs[songIndex]);

// Update Progress bar & time
function updateProgressBar(e) {
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) *100;
        progress.style.width = `${progressPercent}%`;
        // Calculate disaplay for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds =  Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
         // Calculate disaplay for duration
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds =  Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
}

//  Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);