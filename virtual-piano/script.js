const piano = document.querySelector('.piano');
const keys = document.querySelectorAll(".piano-key")
const fullscreen = document.querySelector(".fullscreen")
const btnnotes = document.querySelector('.btn-notes')
const btnletters = document.querySelector('.btn-letters')


function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const StartAudio = (event) => {
  event.target.classList.add("active");
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
}

const StopAudio = (event) => {
  event.target.classList.remove("active");
}

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key"))
  {
  event.target.classList.add("active");
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
  keys.forEach((elem) => {
    elem.addEventListener("mouseover", StartAudio)
    elem.addEventListener("mouseout", StopAudio)
  });
  }
}

const stopCorrespondOver = () => {
  keys.forEach((elem) => {
    elem.classList.remove("active");
    elem.removeEventListener("mouseover", StartAudio)
    elem.removeEventListener("mouseout", StopAudio)
  });
}

piano.addEventListener("mousedown", startCorrespondOver, false);
document.addEventListener("mouseup", stopCorrespondOver);

btnletters.addEventListener('click', () => {
  if (btnnotes.classList.contains('btn-active')) {
    btnnotes.classList.remove('btn-active')
    btnletters.classList.add('btn-active')
    keys.forEach(key => {
      key.classList.add('letter')
    })
  } 
  else {
    btnletters.classList.remove('btn-active')
    btnnotes.classList.add('btn-active')
    keys.forEach(key => {
      key.classList.remove('letter')
    })
  }
})

btnnotes.addEventListener('click', () => {
    if (btnnotes.classList.contains('btn-active')) {
      btnnotes.classList.remove('btn-active')
      btnletters.classList.add('btn-active')
      keys.forEach(key => {
        key.classList.add('letter')
      })
    } 
    else {
      btnletters.classList.remove('btn-active')
      keys.forEach(key => {
        key.classList.remove('letter')
      })
      btnnotes.classList.add('btn-active')
    }
})

function playSound(event) {
const audio = document.querySelector(`audio[data-key="${event.code}"]`);
const key = document.querySelector(`div[data-key="${event.code}"]`);
if (!audio) return;
key.classList.add("playing");
audio.currentTime = 0;
audio.play();
}

window.addEventListener("keydown", (event) => {
  if (!event.repeat) {playSound(event)}
});
    
function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("playing");
}

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

fullscreen.addEventListener('click', () => {
  toggleFullScreen();  
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
