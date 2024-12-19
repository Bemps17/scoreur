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
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
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
    function startTimer() {
        if (isPaused) {
            isPaused = false;
            timer = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        isPaused = true;
        clearInterval(timer);
    }

    function resetTimer() {
        timeLeft = settings.timerDuration;
        updateTimerDisplay();
        pauseTimer();
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
            pauseTimer();
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

    // Animation gagnant
    function showWinnerAnimation() {
        if (settings.winnerAnimationEnabled) {
            const overlay = document.getElementById('winnerOverlay');
            overlay.innerHTML = ''; // Nettoyer les anciennes particules
    
            // Créer et ajouter 30 particules
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = `${Math.random() * 100}vw`; // Position aléatoire en X
                particle.style.setProperty('--random-x', Math.random() - 0.5); // Décalage aléatoire
                particle.style.animationDuration = `${1 + Math.random() * 2}s`; // Durée aléatoire
                overlay.appendChild(particle);
            }
    
            overlay.classList.remove('hidden'); // Affiche l'overlay
    
            // Masquer après 3 secondes
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 3000);
        }
    }
    
    

    // Création des joueurs
    function createPlayer() {
        playerCount++;
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.innerHTML = `
            <button class="delete-player">×</button>
            <input type="text" class="player-name" placeholder="Nom">
            <button class="score-button minus-score">-</button>
            <div class="score-display">0</div>
            <button class="score-button plus-score">+</button>
            <div class="farm-label">Fermes</div>
            <button class="farm-button minus">-</button>
            <div class="farm-count">
                <input type="number" value="0" readonly>
            </div>
            <button class="farm-button plus">+</button>
        `;
        playersContainer.appendChild(playerDiv);
        setupPlayerControls(playerDiv);
    }

    // Gestion des contrôles des joueurs
    function setupPlayerControls(playerDiv) {
        const scoreDisplay = playerDiv.querySelector('.score-display');
        const farmInput = playerDiv.querySelector('.farm-count input');
        let score = 0;
        let farms = 0;

        function checkWinner() {
            if (score >= settings.winPoints) {
                scoreDisplay.classList.add('winner');
                showWinnerAnimation();
               
            }
        }

        playerDiv.querySelector('.plus-score').addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            playSound('pointSound');
            checkWinner();
        });

        playerDiv.querySelector('.minus-score').addEventListener('click', () => {
            score = Math.max(0, score - 1);
            scoreDisplay.textContent = score;
        });

        playerDiv.querySelector('.farm-button.plus').addEventListener('click', () => {
            farms++;
            farmInput.value = farms;
            playSound('farmSound');
        });

        playerDiv.querySelector('.farm-button.minus').addEventListener('click', () => {
            farms = Math.max(0, farms - 1);
            farmInput.value = farms;
            
        });

        playerDiv.querySelector('.delete-player').addEventListener('click', () => {
            const playerName = playerDiv.querySelector('.player-name').value || 'Ce joueur';
            if (confirm(`Voulez-vous vraiment supprimer ${playerName} ?`)) {
                playerDiv.remove();
            }
        });
    }

    // Sauvegarde et chargement des paramètres
    function saveSettings() {
        settings = {
            winPoints: parseInt(document.getElementById('winPoints').value) || 100,
            primaryColor: document.getElementById('primaryColor').value || '#ff7700',
            secondaryColor: document.getElementById('secondaryColor').value || '#ff9944',
            soundEnabled: document.getElementById('soundEnabled').checked,
            timerAlertEnabled: document.getElementById('timerAlertEnabled').checked,
            timerDuration: parseInt(document.getElementById('timerDuration').value) || 45,
            timeExtension: parseInt(document.getElementById('timeExtension').value) || 15,
            winnerAnimationEnabled: document.getElementById('winnerAnimationEnabled').checked
        };

        localStorage.setItem('gameSettings', JSON.stringify(settings));
        updateStyles();
    }

    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
        if (savedSettings) settings = { ...settings, ...savedSettings };

        document.getElementById('winPoints').value = settings.winPoints;
        document.getElementById('primaryColor').value = settings.primaryColor;
        document.getElementById('secondaryColor').value = settings.secondaryColor;
        document.getElementById('soundEnabled').checked = settings.soundEnabled;
        document.getElementById('winnerAnimationEnabled').checked = settings.winnerAnimationEnabled;

        updateStyles();
    }

    function updateStyles() {
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    }

    // Initialisation
    addPlayerBtn.addEventListener('click', createPlayer);
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    document.getElementById('addTime').addEventListener('click', addTimeExtension);
    document.getElementById('saveSettings').addEventListener('click', saveSettings);

    loadSettings();
    resetTimer();
});

