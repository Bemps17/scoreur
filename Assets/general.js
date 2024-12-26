function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Ajout d'un bouton pour activer/désactiver le mode plein écran
const screenButton = document.querySelector('.screenButton');
screenButtonDiv.addEventListener('dblclick', toggleFullScreen);
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Distance minimale pour reconnaître un balayage
    if (endX - startX > threshold) {
        switchTab('scorer'); // Balayage vers la droite
    } else if (startX - endX > threshold) {
        switchTab('timer'); // Balayage vers la gauche
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}
