// Script dédié au timer
document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const timeLeftDisplay = document.getElementById('timeLeft');
    const startPauseButton = document.getElementById('startPauseTimer');
    const resetButton = document.getElementById('resetTimer');
    const addTimeButton = document.getElementById('addTime');
    const preAlertDisplay = document.getElementById('preAlertTime');
    const bipAlertSound = document.getElementById('bipSound');
    const timerAlertSound = document.getElementById('timerAlertSound');
    // Variables globales


    let timer;
    let isPaused = true;
    let timeLeft;


    // Charger les paramètres sauvegardés
    function loadTimerSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        timeLeft = savedSettings?.timerDuration || 45; // Utilise la valeur enregistrée ou par défaut
        updateTimerDisplay();

        const preAlertTime = savedSettings?.preAlertTime || 15;
        preAlertDisplay.textContent = preAlertTime;

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
            if (timeLeft <= 5 && savedSettings?.timerAlertEnabled) {
                playSound('timerAlertSound');
                timeLeftDisplay.classList.add('time-alert');
                
            }

            if (timeLeft === 15) {
                playSound('bipSound');
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
// Éléments DOM supplémentaires
const preAlertInput = document.getElementById('preAlertTime');
const finalCountdownInput = document.getElementById('finalCountdownTime');

// Ajout des variables globales
let preAlertTime;
let finalCountdownTime;

// Modification de loadTimerSettings
function loadTimerSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    timeLeft = savedSettings?.timerDuration || 45;
    preAlertTime = parseInt(preAlertInput.value, 10) || savedSettings?.preAlertTime || 15;
    finalCountdownTime = parseInt(finalCountdownInput.value, 10) || savedSettings?.finalCountdownTime || 5;
    updateTimerDisplay();
    syncInputs();

}

// Ajout de la fonction de synchronisation
function syncInputs() {
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    if (savedSettings) {
        preAlertInput.value = savedSettings.preAlertTime || 15;
        finalCountdownInput.value = savedSettings.finalCountdownTime || 5;
    }
}

// Modification de la fonction updateTimer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === preAlertTime) {
            playSound('bipSound');
        }

        if (timeLeft <= finalCountdownTime) {
            playSound('timerAlertSound');
            timeLeftDisplay.classList.add('time-alert');
        }
    } else {
        clearInterval(timer);
        isPaused = true;
        startPauseButton.textContent = '▶';
        resetAlertStyle();
    }
}

// Modification de la fonction playSound
function playSound(soundId) {
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    if (savedSettings?.soundEnabled) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            if (soundId === 'timerAlertSound') {
                sound.volume = Math.min(2.0, sound.volume * 2);
            }
            sound.play().catch(e => console.log('Erreur de lecture du son:', e));
        }
    }
}