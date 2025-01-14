// Script dédié au timer
document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const timeLeftDisplay = document.getElementById('timeLeft');
    const startPauseButton = document.getElementById('startPauseTimer');
    const resetButton = document.getElementById('resetTimer');
    const addTimeButton = document.getElementById('addTime');

    // Variables globales
    let timer;
    let isPaused = true;
    let timeLeft;

    // Charger les paramètres sauvegardés
    function loadTimerSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        timeLeft = savedSettings?.timerDuration || 45; // Utilise la valeur enregistrée ou par défaut
        updateTimerDisplay();
    }

    // Fonction pour basculer entre Play et Pause
    function toggleTimer() {
        if (isPaused) {
            isPaused = false;
            timer = setInterval(updateTimer, 1000);
            startPauseButton.textContent = '⏸';
        } else {
            isPaused = true;
            clearInterval(timer);
            startPauseButton.textContent = '⏯';
        }
        resetAlertStyle(); // Réinitialise l'affichage
    }

    // Fonction pour réinitialiser le timer
    function resetTimer() {
        clearInterval(timer);
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        timeLeft = savedSettings?.timerDuration || 45;
        updateTimerDisplay();
        isPaused = true;
        startPauseButton.textContent = '▶';
        resetAlertStyle(); // Réinitialise l'affichage
    }

    // Mise à jour de l'affichage du minuteur
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();

            const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
            if (timeLeft <= 10 && savedSettings?.timerAlertEnabled) {
                playSound('timerAlertSound');
                timeLeftDisplay.classList.add('time-alert');
                
            }
        } else {
            clearInterval(timer);
            isPaused = true;
            startPauseButton.textContent = '▶';
            timeLeftDisplay.classList.remove('time-alert');
        }
    }

    function updateTimerDisplay() {
        timeLeftDisplay.textContent = String(timeLeft).padStart(2, '0');
    }

    function addTimeExtension() {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        timeLeft += savedSettings?.timeExtension || 15;
        updateTimerDisplay();
        playSound('pointSound');
        resetAlertStyle(); // Réinitialise l'affichage
    }
 // Fonction pour réinitialiser le style d'alerte
 function resetAlertStyle() {
    timeLeftDisplay.classList.remove('time-alert');
}
    // Sons
    function playSound(soundId) {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        if (savedSettings?.soundEnabled) {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Erreur de lecture du son:', e));
            }
        }
    }

    // Gestion des clics sur le timer
    let tapCount = 0;
    let tapTimeout;

    timeLeftDisplay.addEventListener('click', () => {
        tapCount++;
        clearTimeout(tapTimeout);

        tapTimeout = setTimeout(() => {
            if (tapCount === 1) {
                toggleTimer(); // Simple tap
            }  else if (tapCount === 2) {
                resetTimer();
                toggleTimer(); // Triple tap
            }
            else if (tapCount === 3) {
                resetTimer(); // Double tap
            }
            tapCount = 0; // Réinitialiser le compteur après traitement
        }, 300); // Délai maximum entre les taps
    });

    // Ajout des gestionnaires d'événements
    startPauseButton.addEventListener('click', toggleTimer);
    resetButton.addEventListener('click', resetTimer);
    addTimeButton.addEventListener('click', addTimeExtension);

    // Initialisation
    loadTimerSettings();
    updateTimerDisplay();
});
// Compare this snippet from Assets/js/script.js: