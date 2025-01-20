// Variables globales
let chronoTime = 0;
let chronoInterval = null;
let timerTime = 0;
let timerInterval = null;

// Son du timer
const timerSoundTools = new Audio('/sounds/alert.mp3');
timerSoundTools.volume = 1;
timerSoundTools.playbackRate = 0.5;

timerSoundTools.addEventListener('ended', function() {
    this.currentTime = 0;
    this.playCount = (this.playCount || 0) + 1;
    if (this.playCount < 3) {
        this.play();
    } else {
        this.playCount = 0;
    }
});

// Fonctions d'affichage
function toggleChronometerTools() {
    const controls = document.getElementById('controls-tools');
    controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
}

function closeChronometerTools() {
    document.getElementById('controls-tools').style.display = 'none';
}

// Fonctions chronomètre
function startChronometerTools() {
    if (!chronoInterval) {
        chronoInterval = setInterval(() => {
            chronoTime++;
            displayChronoTimeTools();
        }, 1000);
    }
}

function stopChronometerTools() {
    clearInterval(chronoInterval);
    chronoInterval = null;
}

function resetChronometerTools() {
    stopChronometerTools();
    chronoTime = 0;
    displayChronoTimeTools();
}

function displayChronoTimeTools() {
    const minutes = Math.floor(chronoTime / 60);
    const seconds = chronoTime % 60;
    const display = document.getElementById('chrono-display-tools');
    if (display) {
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Fonctions timer
function startTimerFromInputTools() {
    const seconds = parseInt(document.getElementById('timer-input-seconds-tools').value) || 0;
    const minutes = parseInt(document.getElementById('timer-input-minutes-tools').value) || 0;
    const totalSeconds = (minutes * 60) + seconds;

    if (totalSeconds > 0) {
        startTimerTools(totalSeconds);
    } else {
        alert("Veuillez entrer un temps valide");
    }
}

function startTimerTools(duration) {
    const startButton = document.querySelector('.start-timer-tools');

    if (!startButton) {
        console.error('Start button element not found');
        return;
    }

    if (timerInterval) {
        // If timer is running, pause it
        clearInterval(timerInterval);
        timerInterval = null;
    headerDisplay.classList.add('paused');
        startButton.textContent = 'Start';
    } else {
        // If timer is paused, start/resume it
        if (!timerTime) {
            // New timer
            timerTime = duration;
   
        }


        displayTimerTimeTools();
        startButton.textContent = 'Pause';
       
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                displayTimerTimeTools();
                if (timerTime === 0) {
                    timerSoundTools.play().catch(console.error);
                    clearInterval(timerInterval);
                    timerInterval = null;
                    startButton.textContent = 'Start';
                }
            }
        }, 1000);
    }
}

function stopTimerTools() {
    clearInterval(timerInterval);
}

function resetTimerTools() {
    clearInterval(timerInterval);
    timerTime = 0;
    displayTimerTimeTools();
    const headerDisplay = document.getElementById('header-timer-display');
    if (headerDisplay) {
        headerDisplay.classList.remove('alert');
        headerDisplay.classList.remove('paused');
        headerDisplay.style.fontWeight = '';
    }
}

function displayTimerTimeTools() {
    const minutes = Math.floor(timerTime / 60);
    const seconds = timerTime % 60;
    const display = document.getElementById('timer-display-tools');
    const headerDisplay = document.getElementById('header-timer-display');

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (display) {
        display.textContent = formattedTime;
    }

    if (headerDisplay) {
        headerDisplay.textContent = formattedTime;

        // Ajout de l'alerte pour le headerDisplay
        if (timerTime <= 600) {
            headerDisplay.classList.add('alert'); // Ajout de la classe alert
            headerDisplay.style.fontWeight = "bold"; // Style supplémentaire (optionnel)
        } else {
            headerDisplay.classList.remove('alert');
            headerDisplay.style.fontWeight = ""; // Réinitialisation du style
        }
    }
    if (!timerInterval || timerTime === 0) {
        headerDisplay.classList.add('paused'); // Ajout de la classe paused
    } else {
        headerDisplay.classList.remove('paused'); // Suppression de la classe paused
    }
}

// Pause/Resume du timer au tap sur le headerDisplay (mobile)
const headerDisplay = document.getElementById('header-timer-display');
if (headerDisplay) {
    headerDisplay.addEventListener('click', () => {
        if (timerInterval) {
            // Pause du timer
            clearInterval(timerInterval);
            timerInterval = null;
            const startButton = document.querySelector('.start-timer-tools');
            if (startButton) startButton.textContent = 'Start';
        } else {
            // Reprise du timer
            startTimerTools(timerTime);
            
        }

        // Mise à jour de l'affichage
        displayTimerTimeTools();

        // Ajout de l'alerte pour le headerDisplay
        if (timerTime <= 600) {
            headerDisplay.classList.add('alert'); // Ajout de la classe alert
            headerDisplay.style.fontWeight = "bold"; // Style supplémentaire (optionnel)
        } else {
            headerDisplay.classList.remove('alert');
            headerDisplay.style.fontWeight = ""; // Réinitialisation du style
        }

        if (!timerInterval || timerTime === 0) {
            headerDisplay.classList.add('paused'); // Ajout de la classe paused
        } else {
            headerDisplay.classList.remove('paused'); // Suppression de la classe paused
        }

    
    });
}
// Event listeners for timer controls
document.getElementById('startTimerTools').addEventListener('click', () => startTimerFromInputTools());
document.getElementById('stopTimerTools').addEventListener('click', stopTimerTools);
document.getElementById('resetTimerTools').addEventListener('click', resetTimerTools);

// Initial display
displayChronoTimeTools();
displayTimerTimeTools();


// Modifie la fonction displayTimerTimeTools pour masquer/afficher le header-timer-display
function updateHeaderDisplay() {
    const headerDisplay = document.getElementById('header-timer-display');
    const timerDisplay = document.getElementById('timer-display-tools');
    
    if (headerDisplay && timerDisplay) {
        headerDisplay.style.display = timerDisplay.textContent === '00:00' ? 'none' : 'block';
    }
}

// Observer les changements du timer-display-tools
const observer = new MutationObserver(updateHeaderDisplay);
const timerDisplay = document.getElementById('timer-display-tools');
if (timerDisplay) {
    observer.observe(timerDisplay, { childList: true });
}
   
// Masquer le header-timer-display quand le timer atteint 0
if (timerTime === 0) {
    headerDisplay.style.display = 'none';
}  
// Get the title element
const titleElement = document.getElementById('titleH1');

// Modify updateHeaderDisplay to also handle the title visibility
function updateHeaderDisplay() {
    const headerDisplay = document.getElementById('header-timer-display');
    const timerDisplay = document.getElementById('timer-display-tools');
    
    if (headerDisplay && timerDisplay) {
        
        headerDisplay.style.display = timerDisplay.textContent === '00:00' ? 'none' : 'block';
        titleElement.style.display = timerDisplay.textContent === '00:00' ? 'block' : 'none';
    }
}
