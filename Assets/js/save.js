// Gestion centralisée des sauvegardes

// Paramètres par défaut
const defaultSettings = {
    winPoints: 7,
    primaryColor: '#08196f',
    secondaryColor: '#007bff',
    soundEnabled: true,
    timerAlertEnabled: true,
    timerDuration: 45,
    timeExtension: 15,
    winnerAnimationEnabled: true,
    timeLeft: 45, // État du timer
    isPaused: true, // État de pause
    players: [] // État des joueurs
};

// Charger les paramètres sauvegardés
function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    return { ...defaultSettings, ...savedSettings };
}

// Sauvegarder les paramètres globaux
function saveSettings(settings) {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
}

// Sauvegarder l'état du timer
function saveTimerState(timeLeft, isPaused) {
    const settings = loadSettings();
    settings.timeLeft = timeLeft;
    settings.isPaused = isPaused;
    saveSettings(settings);
}

// Restaurer l'état du timer
function restoreTimerState() {
    const settings = loadSettings();
    return {
        timeLeft: settings.timeLeft,
        isPaused: settings.isPaused
    };
}

// Sauvegarder l'état des joueurs
function savePlayers(players) {
    const settings = loadSettings();
    settings.players = players;
    saveSettings(settings);
}

// Restaurer l'état des joueurs
function restorePlayers() {
    const settings = loadSettings();
    return settings.players || [];
}

// Appliquer les styles personnalisés
function applyStyles(settings) {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
}

// Mise à jour automatique des paramètres globaux
function autoSaveSettings() {
    const settings = loadSettings();
    settings.winPoints = parseInt(document.getElementById('winPoints').value) || 7;
    settings.primaryColor = document.getElementById('primaryColor').value || '#08196f';
    settings.secondaryColor = document.getElementById('secondaryColor').value || '#007bff';
    settings.soundEnabled = document.getElementById('soundEnabled').checked;
    settings.timerAlertEnabled = document.getElementById('timerAlertEnabled').checked;
    settings.timerDuration = parseInt(document.getElementById('timerDuration').value) || 45;
    settings.timeExtension = parseInt(document.getElementById('timeExtension').value) || 15;
    settings.winnerAnimationEnabled = document.getElementById('winnerAnimationEnabled').checked;

    // Synchroniser uniquement les paramètres globaux, pas l'état du timer
    saveSettings({ ...settings, timeLeft: undefined, isPaused: undefined });
    applyStyles(settings);
}

// Initialisation des paramètres
const settings = loadSettings();
applyStyles(settings);

// Gestion des événements pour mise à jour automatique
document.getElementById('winPoints').addEventListener('change', autoSaveSettings);
document.getElementById('primaryColor').addEventListener('input', autoSaveSettings);
document.getElementById('secondaryColor').addEventListener('input', autoSaveSettings);
document.getElementById('soundEnabled').addEventListener('change', autoSaveSettings);
document.getElementById('timerAlertEnabled').addEventListener('change', autoSaveSettings);
document.getElementById('timerDuration').addEventListener('change', () => {
    autoSaveSettings();
    const newDuration = parseInt(document.getElementById('timerDuration').value) || 45;
    saveTimerState(newDuration, true); // Redémarrer avec la nouvelle durée
});
document.getElementById('timeExtension').addEventListener('change', autoSaveSettings);
document.getElementById('winnerAnimationEnabled').addEventListener('change', autoSaveSettings);

// Restauration de l'état du timer au chargement
const { timeLeft, isPaused } = restoreTimerState();
saveTimerState(timeLeft || settings.timerDuration, isPaused); // Valeurs par défaut si non défini
