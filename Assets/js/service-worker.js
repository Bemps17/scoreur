// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker enregistré:', registration.scope);
        })
        .catch(error => {
            console.error('Erreur d\'enregistrement du Service Worker:', error);
        });
}

// Notifications
function showNotification(title, options) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, options);
        });
    }
}

function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            showNotification('Permission accordée', {
                body: 'Vous recevrez des notifications pour les scores et le temps de jeu.'
            });
        }
    });
}

// Notification de test
const testNotificationButton = document.querySelector('.test-notification');
if (testNotificationButton) {
    testNotificationButton.addEventListener('click', () => {
        showNotification('Test de notification', {
            body: 'Ceci est une notification de test.'
        });
    });
}

// Gestion des notifications de score
const scoreForm = document.querySelector('.score-form');
if (scoreForm) {
    scoreForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const score = document.getElementById('score').value;
        showNotification('Nouveau score', {
            body: `Score: ${score}`
        });
    });
}

// Gestion des notifications de temps de jeu
const timerForm = document.querySelector('.timer-form');
if (timerForm) {
    timerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const time = document.getElementById('time').value;
        showNotification('Temps écoulé', {
            body: `Temps: ${time}`
        });
    });
}

// Gestion des notifications de score et de temps de jeu
const combinedForm = document.querySelector('.combined-form');
if (combinedForm) {
    combinedForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const score = document.getElementById('score').value;
        const time = document.getElementById('time').value;
        showNotification('Score et temps', {
            body: `Score: ${score}, Temps: ${time}`
        });
    });
}

