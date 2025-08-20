const songs = [
  { title: "Song 1", artist: "Pop Artist", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Song 2", artist: "Rock Band", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Song 3", artist: "Classical Composer", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Song 4", artist: "Jazz Singer", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Song 5", artist: "Instrumentalist", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
];

let currentSongIndex = 0;
let isRepeat = false;
let isPlaying = false;
const audio = new Audio();

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist").getElementsByTagName("li");

// Load a song
function loadSong(index) {
  currentSongIndex = index;
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  highlightSong(index);
}

// Highlight active song in playlist
function highlightSong(index) {
  for (let i = 0; i < playlist.length; i++) {
    playlist[i].classList.remove("active");
  }
  playlist[index].classList.add("active");
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// Toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Toggle repeat
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#00cec9" : "white";
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});

// Seek song
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// When song ends
audio.addEventListener("ended", () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});

// Playlist click
for (let i = 0; i < playlist.length; i++) {
  playlist[i].addEventListener("click", () => {
    loadSong(i);
    playSong();
  });
}

// Button events
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Load first song by default
loadSong(currentSongIndex);
