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
    }

    // Fonction pour réinitialiser le timer
    function resetTimer() {
        clearInterval(timer);
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        timeLeft = savedSettings?.timerDuration || 45;
        updateTimerDisplay();
        isPaused = true;
        startPauseButton.textContent = '▶';
    }

    // Mise à jour de l'affichage du minuteur
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();

            const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
            if (timeLeft <= 5 && savedSettings?.timerAlertEnabled) {
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
    let lastTap = 0;
    timeLeftDisplay.addEventListener('click', () => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) { // Double-tap détecté
            resetTimer();
        } else { // Simple tap détecté
            toggleTimer();
        }
        lastTap = currentTime;
    });

    // Ajout des gestionnaires d'événements
    startPauseButton.addEventListener('click', toggleTimer);
    resetButton.addEventListener('click', resetTimer);
    addTimeButton.addEventListener('click', addTimeExtension);

    // Initialisation
    loadTimerSettings();
    updateTimerDisplay();
});
