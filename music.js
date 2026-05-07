// NOTICE: All the flyingCardLayer related events codes are made supported by AI for my own curiosity. Please check previous commited version for original code.

const musicCards = document.querySelectorAll(".music-card");
const musicOverlay = document.getElementById("music-overlay");
const musicModal = document.querySelector(".music-modal");
const closeMusicModal = document.getElementById("close-music-modal");
const flyingCardLayer = document.getElementById("flying-card-layer");

const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalAudio = document.getElementById("modal-audio");
const modalAudioSource = document.getElementById("modal-audio-source");

let activeCard = null;
let activeFlyingCard = null;

musicCards.forEach(function (card) {
    card.addEventListener("click", function () {
        openFlyingCard(card);
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

function openFlyingCard(card) {
    if (!musicOverlay || !musicModal || !flyingCardLayer) {
        return;
    }

    activeCard = card;

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

    const rect = card.getBoundingClientRect();

    const clone = card.cloneNode(true);
    clone.classList.add("flying-card");

    clone.style.top = rect.top + "px";
    clone.style.left = rect.left + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";

    flyingCardLayer.innerHTML = "";
    flyingCardLayer.appendChild(clone);

    activeFlyingCard = clone;
    card.classList.add("animating-out");

    musicOverlay.classList.remove("hidden");
    musicModal.classList.add("hidden-modal");

    requestAnimationFrame(function () {
        const targetWidth = Math.min(window.innerWidth * 0.34, 360);
        const targetHeight = rect.height * (targetWidth / rect.width);

        const targetLeft = (window.innerWidth - targetWidth) / 2;
        const targetTop = (window.innerHeight - targetHeight) / 2 - 40;

        clone.style.top = targetTop + "px";
        clone.style.left = targetLeft + "px";
        clone.style.width = targetWidth + "px";
        clone.style.height = targetHeight + "px";
        clone.style.transform = "rotateY(180deg) scale(1.04)";
    });

    clone.addEventListener(
        "transitionend",
        function handleTransitionEnd(event) {
            if (event.propertyName !== "transform") {
                return;
            }

            clone.removeEventListener("transitionend", handleTransitionEnd);

            clone.style.opacity = "0";
            musicModal.classList.remove("hidden-modal");
        },
        { once: false }
    );
}

function closeMusicPlayer() {
    if (!musicOverlay || !musicModal) {
        return;
    }

    modalAudio.pause();
    modalAudio.currentTime = 0;

    musicModal.classList.add("hidden-modal");

    if (activeFlyingCard) {
        activeFlyingCard.remove();
        activeFlyingCard = null;
    }

    if (activeCard) {
        activeCard.classList.remove("animating-out");
        activeCard = null;
    }

    musicOverlay.classList.add("hidden");
}