function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Erreur mode plein écran: ${err.message}`);
        });
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Ajout d'un bouton pour activer/désactiver le mode plein écran
const screenButton = document.querySelector('.screenButton');
if (screenButton) {
    screenButton.addEventListener('dblclick', toggleFullScreen);
}

// Variables pour la gestion du swipe
let startX = null;
let startTime = null;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startTime = Date.now();
});

document.addEventListener('touchend', (e) => {
    if (!startX) return;
    
    const endX = e.changedTouches[0].clientX;
    const elapsedTime = Date.now() - startTime;
    handleSwipe(startX, endX, elapsedTime);
    
    // Reset des valeurs
    startX = null;
    startTime = null;
});

function handleSwipe(startX, endX, elapsedTime) {
    const threshold = 50; // Distance minimale pour reconnaître un balayage
    const maxTime = 300; // Temps maximum pour un swipe valide (en ms)
    
    if (elapsedTime > maxTime) return; // Swipe trop lent
    
    const distance = endX - startX;
    const absDistance = Math.abs(distance);
    
    if (absDistance < threshold) {
        switchTab('timer'); // Tap ou petit mouvement -> tab central
    } else if (distance > 0) {
        switchTab('scorer'); // Swipe vers la droite
    } else {
        switchTab('chronoPartie'); // Swipe vers la gauche
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) activeButton.classList.add('active');

    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.add('active');
}const tabs = ['chronoPartie', 'timer', 'scorer']; // Ordre des onglets de gauche à droite

function handleSwipe(startX, endX, elapsedTime) {
    const threshold = 50;
    const maxTime = 300;
    
    if (elapsedTime > maxTime) return;
    
    const distance = endX - startX;
    const absDistance = Math.abs(distance);
    
    if (absDistance < threshold) return;

    // Trouver l'index de l'onglet actif
    const activeTab = document.querySelector('.tab-pane.active');
    const currentIndex = tabs.indexOf(activeTab.id);
    
    if (distance > 0 && currentIndex < tabs.length - 1) {
        // Swipe vers la droite -> onglet suivant
        switchTab(tabs[currentIndex + 1]);
    } else if (distance < 0 && currentIndex > 0) {
        // Swipe vers la gauche -> onglet précédent
        switchTab(tabs[currentIndex - 1]);
    }
}

// Gestion du swipe pour le panneau paramètres

    const settingsPanel = document.querySelector('.settings-panel');
    let panelStartX = null;

    settingsPanel.addEventListener('touchstart', (e) => {
        if (!settingsPanel.classList.contains('active')) return;
        panelStartX = e.touches[0].clientX;
        e.stopPropagation();
    });

    settingsPanel.addEventListener('touchend', (e) => {
        if (!panelStartX) return;
        const panelEndX = e.changedTouches[0].clientX;
        const distance = panelEndX - panelStartX;
        
        if (distance > 50) {
            settingsPanel.classList.remove('active');
        }
        
        panelStartX = null;
        e.stopPropagation();
    });

    