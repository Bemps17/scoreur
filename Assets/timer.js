document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const playersContainer = document.getElementById('players');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const settingsBtn = document.querySelector('.settings-button');
    const settingsPanel = document.querySelector('.settings-panel');
    const timerDisplay = document.getElementById('timerDisplay');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const winnerOverlay = document.getElementById('winnerOverlay');

    // Gestion des onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Variables globales
    let playerCount = 0;
    let timer;
    let timeLeft = 900; // 15 minutes en secondes
    let isPaused = true;

    // Configuration par défaut
    let settings = {
        winPoints: 7,
        primaryColor: '#ff7700',
        secondaryColor: '#ff9944',
        soundEnabled: true,
        timerAlertEnabled: true,
        timerDuration: 45,
        timeExtension: 15,
        winnerAnimationEnabled: true // Animation désactivable
    };

    // Gestion des onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.dataset.tab;
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Paramètres
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });

    // Timer
    function toggleTimer() {
        if (isPaused) {
            isPaused = false;
            timer = setInterval(updateTimer, 1000);
            document.getElementById('startTimer').textContent = '⏸️';
        } else {
            isPaused = true;
            clearInterval(timer);
            document.getElementById('startTimer').textContent = '▶️';
        }
    }

    function resetTimer() {
        timeLeft = settings.timerDuration;
        updateTimerDisplay();
        clearInterval(timer);
        isPaused = true;
        document.getElementById('startTimer').textContent = '▶️';
    }

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 5 && timeLeft > 0) {
                playSound('timerAlertSound');
                timeLeftDisplay.classList.add('time-alert');
            }
        } else {
            clearInterval(timer);
            isPaused = true;
            document.getElementById('startTimer').textContent = '▶️';
            timeLeftDisplay.classList.remove('time-alert');
            alert('Temps écoulé !');
        }
    }

    function updateTimerDisplay() {
        timeLeftDisplay.textContent = String(timeLeft).padStart(2, '0');
    }

    function addTimeExtension() {
        timeLeft += settings.timeExtension;
        updateTimerDisplay();
        playSound('pointSound');
    }

    // Sons
    function playSound(soundId) {
        if (settings.soundEnabled) {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Erreur de lecture du son:', e));
            }
        }
    }

    // Initialisation
    addPlayerBtn.addEventListener('click', createPlayer);
    document.getElementById('startTimer').addEventListener('click', toggleTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    document.getElementById('addTime').addEventListener('click', addTimeExtension);

    loadSettings();
    resetTimer();

    // Suppression du bouton pause
    const pauseButton = document.getElementById('pauseTimer');
    if (pauseButton) {
        pauseButton.remove();
    }
});
