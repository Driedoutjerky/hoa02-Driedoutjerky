const musicCards = document.querySelectorAll(".music-card");
const musicGrid = document.querySelector(".music-grid");
const musicOverlay = document.getElementById("music-overlay");
const closeMusicModal = document.getElementById("close-music-modal");

const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalAudio = document.getElementById("modal-audio");
const modalAudioSource = document.getElementById("modal-audio-source");

musicCards.forEach(function (card) {
    card.addEventListener("click", function () {
        musicCards.forEach(function (c) {
            c.classList.remove("selected");
        });

        card.classList.add("selected");

        if (musicGrid) {
            musicGrid.classList.add("has-selected");
        }

        const title = card.dataset.title;
        const description = card.dataset.description;
        const audio = card.dataset.audio;
        const cover = card.dataset.cover;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalCover.src = cover;
        modalCover.alt = title + " cover";

        modalAudioSource.src = audio;
        modalAudio.load();

        musicOverlay.classList.remove("hidden");
    });
});

if (closeMusicModal) {
    closeMusicModal.addEventListener("click", function () {
        closeMusicPlayer();
    });
}

if (musicOverlay) {
    musicOverlay.addEventListener("click", function (event) {
        if (event.target === musicOverlay) {
            closeMusicPlayer();
        }
    });
}

function closeMusicPlayer() {
    musicOverlay.classList.add("hidden");

    modalAudio.pause();
    modalAudio.currentTime = 0;

    musicCards.forEach(function (c) {
        c.classList.remove("selected");
    });

    if (musicGrid) {
        musicGrid.classList.remove("has-selected");
    }
}