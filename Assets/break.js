       // Nouvelle modale pour le bouton "!"
       const breakModal = document.createElement('div');
       breakModal.classList.add('modal');
       breakModal.innerHTML = `
           <div class="modal-content">
               <span class="close">&times;</span>
               <h2>Confirmation de casse gagnée</h2>
               <p>Ce joueur a remporté la casse.</p>
               <button id="confirmBreakModal">Confirmer</button>
               <button id="cancelBreakModal">Annuler</button>
               <button id="removeWhiteBall">Supprimer la bille blanche</button>
           </div>
       `;
       document.body.appendChild(breakModal);
   
       const closeBreakModal = breakModal.querySelector('.close');
       const confirmBreakModal = breakModal.querySelector('#confirmBreakModal');
       const cancelBreakModal = breakModal.querySelector('#cancelBreakModal');
       const removeWhiteBall = breakModal.querySelector('#removeWhiteBall');
   
       let selectedScoreDisplay = null; // Variable pour stocker l'élément DOM sélectionné
   
       // Ouvre la modale pour "!"
       document.addEventListener('click', (e) => {
           if (e.target.classList.contains('break')) {
               breakModal.style.display = 'block';
               selectedScoreDisplay = e.target.closest('.player').querySelector('.BreakWin');
           }
       });
   
       // Confirme la casse gagnée
       confirmBreakModal.addEventListener('click', () => {
           if (selectedScoreDisplay && !selectedScoreDisplay.querySelector('.white-ball')) {
               const whiteBall = document.createElement('div');
               whiteBall.className = 'white-ball';
               whiteBall.style.width = '12px';
               whiteBall.style.height = '12px';
               whiteBall.style.borderRadius = '50%';
               whiteBall.style.backgroundColor = 'white';
               whiteBall.style.display = 'inline-block';
               whiteBall.style.marginLeft = '50%'
                 whiteBall.style.position = 'absolute'
               selectedScoreDisplay.appendChild(whiteBall);
           }
           breakModal.style.display = 'none';
       });
   
       // Supprimer la bille blanche
       removeWhiteBall.addEventListener('click', () => {
           if (selectedScoreDisplay) {
               const whiteBall = selectedScoreDisplay.querySelector('.white-ball');
               if (whiteBall) {
                   selectedScoreDisplay.removeChild(whiteBall);
               }
           }
           breakModal.style.display = 'none';
       });
   
       // Annule la casse gagnée
       cancelBreakModal.addEventListener('click', () => {
           breakModal.style.display = 'none';
       });
   
       // Ferme la modale
       closeBreakModal.addEventListener('click', () => {
           breakModal.style.display = 'none';
       });
   
       window.addEventListener('click', (event) => {
           if (event.target === breakModal) {
               breakModal.style.display = 'none';
           }
       });
 



