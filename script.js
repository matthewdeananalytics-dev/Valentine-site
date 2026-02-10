// ===== SAFE ELEMENT REFERENCES =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const lockedContent = document.getElementById("lockedContent");
const musicPlayer = document.getElementById("musicPlayer");


// ===== PLAYLIST =====
const playlist = [
  "music/song1.mp3",
  "music/song2.mp3",
  "music/song3.mp3",
  "music/song4.mp3"
];

let currentSongIndex = 0;

// ===== PLAY SONG FUNCTION =====
function playSong(index) {
  if (!musicPlayer) return;
  musicPlayer.src = playlist[index];
  musicPlayer.play().catch(() => {
    console.log("User interaction required to play audio.");
  });
}

// ===== YES BUTTON =====
if (yesBtn) {
  yesBtn.addEventListener("click", () => {

    // Unlock content if it exists
    if (lockedContent) {
      lockedContent.style.display = "block";
      lockedContent.scrollIntoView({ behavior: "smooth" });
    }

    // Start music
    if (musicPlayer && musicPlayer.paused) {
      playSong(currentSongIndex);
    }
  });
}

// ===== AUTO NEXT SONG =====
if (musicPlayer) {
  musicPlayer.addEventListener("ended", () => {
    currentSongIndex++;

    if (currentSongIndex >= playlist.length) {
      currentSongIndex = 0; // loop playlist
    }

    playSong(currentSongIndex);
  });
}

// ===== NO BUTTON DODGE =====
if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ===== GAME BUTTON (VERY IMPORTANT) =====
window.startGame = function () {
  console.log("I wanna play"); // test line
  window.location.href = "game.html";
};


function scrollToChapter(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// GET ELEMENTS
// Wait until page loads
// Wait until page loads
window.addEventListener("DOMContentLoaded", () => {

  const mapDiv = document.getElementById("travelMap");
  const mapResult = document.getElementById("mapResult");

  if (!mapDiv || typeof L === "undefined") return;

  // Create map
  const map = L.map('travelMap').setView([20, -70], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let found = [];
  let futureUnlocked = false;

  const locations = {
    dominican: { lat: 18.7, lng: -70.2 },
    puertorico: { lat: 18.2, lng: -66.5 },
    saintmartin: { lat: 18.07, lng: -63.05 }
  };

  const bahamas = { lat: 25.0343, lng: -77.3963 };

  const tolerance = 150; // km

  map.on("click", function(e) {

    let correct = false;

    // Check main islands
    for (let place in locations) {
      const loc = locations[place];

      const distance = map.distance(
        [e.latlng.lat, e.latlng.lng],
        [loc.lat, loc.lng]
      ) / 1000;

      if (distance < tolerance && !found.includes(place)) {
        found.push(place);
        correct = true;

        L.marker([loc.lat, loc.lng], {
          icon: L.divIcon({
            className: 'heart-marker',
            html: '❤',
            iconSize: [20, 20]
          })
        }).addTo(map);

        mapResult.innerHTML = `Memory found: ${found.length} / 3`;

        if (found.length === 3) {
          futureUnlocked = true;
          mapResult.innerHTML =
            "All three are correct… but you’re missing one. This one is for the future.";
        }
      }
    }

    // Check Bahamas
    if (futureUnlocked) {
      const distanceToBahamas = map.distance(
        [e.latlng.lat, e.latlng.lng],
        [bahamas.lat, bahamas.lng]
      ) / 1000;

      if (distanceToBahamas < tolerance) {
        L.marker([bahamas.lat, bahamas.lng], {
          icon: L.divIcon({
            className: 'heart-marker',
            html: '❤',
            iconSize: [20, 20]
          })
        }).addTo(map);

        mapResult.innerHTML = "We’re going to the Bahamas 🌴✈️";
        celebrateConfetti();


        futureUnlocked = false;
        return;
      }
    }

    if (!correct) {
      document.body.classList.add("shake");
      setTimeout(() => {
        document.body.classList.remove("shake");
      }, 400);
    }
    function celebrateConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
}

  });

});

function checkMemoryDate() {
  const a1 = document.getElementById("answer1").value.trim().toLowerCase();
  const a2 = document.getElementById("answer2").value.trim().toLowerCase();
  const a3 = document.getElementById("answer3").value.trim();
  const result = document.getElementById("memoryResult");

  if (
    a1 === "september" &&
    a2 === "3rd" &&
    a3 === "2018"
  ) {
    result.innerHTML = "You remembered our beginning 💜";

    if (typeof confetti === "function") {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 }
      });
    }

    const next = document.getElementById("chapterThree");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }

  } else {
    result.innerHTML = "Look closer… the moment is in the memories.";
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 400);
  }
}

function clearMemoryDate() {
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";
  document.getElementById("memoryResult").innerHTML = "";
}

function selectDinner(choice) {
  const buttons = document.querySelectorAll(".dinner-btn");
  const result = document.getElementById("dinnerResult");

  // remove previous selection
  buttons.forEach(btn => btn.classList.remove("selected"));

  // highlight clicked button
  event.target.classList.add("selected");

  // message
  result.innerHTML = `Perfect choice… ${choice} it is. 🍽️`;

  // optional: scroll to next chapter later

}
 window.checkAlways = function () {
  const input = document.getElementById("alwaysInput");
  const result = document.getElementById("alwaysResult");

  if (!input || !result) return;

  const answer = input.value.trim().toLowerCase();

  if (answer === "always") {
    result.innerHTML = "Forever. Always. 💜";

    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.7 }
      });
    }

    const next = document.getElementById("chapterFive");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }

  } else {
    result.innerHTML =
      "Read the promise again… the answer lives in the heart of it.";

    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 400);
  }
};

window.clearAlways = function () {
  const input = document.getElementById("alwaysInput");
  const result = document.getElementById("alwaysResult");

  if (input) input.value = "";
  if (result) result.innerHTML = "";
};
