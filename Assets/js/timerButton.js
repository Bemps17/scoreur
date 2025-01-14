document.addEventListener('DOMContentLoaded', () => {
    const showTimerButtonsCheckbox = document.getElementById('showTimerButtons');
    const timerControls = document.querySelector('.timer-controls');
    const timerDisplay = document.querySelector('.timer-display');

    // Charger l'état initial depuis les paramètres
    const settings = loadSettings();
    const showButtons = settings.showTimerButtons ?? true;

    // Appliquer l'état initial
    function applyButtonVisibility(show) {
        if (show) {
            timerControls.classList.remove('hidden');
            timerDisplay.classList.remove('compact');
        } else {
            timerControls.classList.add('hidden');
            timerDisplay.classList.add('compact');
        }
    }

    applyButtonVisibility(showButtons);

    // Sauvegarder les changements
    showTimerButtonsCheckbox.checked = showButtons;
    showTimerButtonsCheckbox.addEventListener('change', () => {
        const show = showTimerButtonsCheckbox.checked;
        applyButtonVisibility(show);
        const updatedSettings = { ...loadSettings(), showTimerButtons: show };
        saveSettings(updatedSettings);
    });
});
