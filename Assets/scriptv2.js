document.addEventListener('DOMContentLoaded', () => {
    // Création de la fenêtre contextuelle (popup)
    const modal = document.createElement('div');
    modal.classList.add('modal', 'hidden');
    modal.innerHTML = `
        <div class="modal-content">
            <input type="text" id="editNameInput" placeholder="Nouveau nom">
            <button id="saveName">Sauvegarder</button>
            <button id="cancelEdit">Annuler</button>
        </div>
    `;
    document.body.appendChild(modal);

    let currentEditingPlayer = null;

    // Gestion de l'ouverture du popup
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('player-name')) {
            currentEditingPlayer = event.target;
            modal.classList.remove('hidden');
            document.getElementById('editNameInput').value = currentEditingPlayer.value;
        }
    });

    // Sauvegarde du nom modifié
    document.getElementById('saveName').addEventListener('click', () => {
        const newName = document.getElementById('editNameInput').value;
        if (currentEditingPlayer && newName.trim() !== '') {
            currentEditingPlayer.value = newName;
        }
        modal.classList.add('hidden');
    });

    // Annulation de la modification
    document.getElementById('cancelEdit').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Fermeture de la popup en cliquant à l'extérieur
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
