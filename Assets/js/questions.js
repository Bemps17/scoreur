document.addEventListener('DOMContentLoaded', () => {
    // Création et gestion de la modale pour le bouton "?"
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
         
        
            
            <h2>Aide</h2>
            <div class="help-content">
                <h3>Comment utiliser l'application</h3>
                <ul>
                    <li>Ajoutez des joueurs avec le bouton "+"</li>
                    <li>Cliquez sur le nom d'un joueur pour le modifier</li>
                    <li>Utilisez les boutons + et - pour gérer les scores</li>
                    <li>Le bouton "B" permet de gérer les casses</li>
                    <li>Utilisez le timer pour chronométrer les manches</li>
                </ul>
                <h3>Paramètres</h3>
                <ul>
                  <li>Personnalisation des couleurs</li>
                    <li>Nombre de points gagnant</li>
                    <li>Sons activés/désactivés</li>
                    <li>Animations activées/désactivées</li>
                    <li>Afficher les controles du timer</li>
                    <li>Durée du timer</li>
                    <li>Durée de l'extension</li>
                    Les paramètres sont sauvegardés automatiquement
                </ul>
            </div>
            <div class="button-container">
             <div class="cta-button"><a href="contact.html" target="_blank"
                        rel="noopener noreferrer">Me contacter</a></div>
                <a class="bymail" href="mailto:bertrandfouquet@gmail.com" target="_blank" rel="noopener noreferrer">Par mail</a>
            </div>
           
        </div>
           
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

    // html: <button id="confirmModal">Fermer</button>
    // 
    // 
    //  script: confirmModal.addEventListener('click', () => {
    //     alert('Bonne journée');
    //     modal.style.display = 'none';
    // });

});
