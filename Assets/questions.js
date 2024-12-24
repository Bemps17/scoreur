document.addEventListener('DOMContentLoaded', () => {
    // Création et gestion de la modale pour le bouton "?"
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2> <div class="setting-group logoContainer"><a href="contact.html" target="_blank"
                        rel="noopener noreferrer">Me contacter</a></div></h2>
           
            <button id="confirmModal">Fermer</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = modal.querySelector('.close');
    const confirmModal = modal.querySelector('#confirmModal');

    // Ouvre la modale lorsqu'un bouton "?" est cliqué
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('questions')) {
            modal.style.display = 'block';
        }
    });

    // Ferme la modale
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    confirmModal.addEventListener('click', () => {
        alert('Bonne journée');
        modal.style.display = 'none';
    });

});