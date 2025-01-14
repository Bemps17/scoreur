// Gestionnaire pour le bouton "C"
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('break')) {
        // Récupérer l'affichage du score du joueur
        const scoreDisplay = e.target.closest('.player').querySelector('.BreakWin');
        
        if (scoreDisplay) {
            // Vérifier si la boule blanche est déjà présente
            const whiteBall = scoreDisplay.querySelector('.white-ball');
            
            if (whiteBall) {
                // Supprimer la boule blanche si elle est déjà là
                scoreDisplay.removeChild(whiteBall);
            } else {
                // Ajouter la boule blanche si elle n'est pas encore présente
                const newWhiteBall = document.createElement('div');
                newWhiteBall.className = 'white-ball';
                newWhiteBall.style.width = '12px';
                newWhiteBall.style.height = '12px';
                newWhiteBall.style.borderRadius = '50%';
                newWhiteBall.style.backgroundColor = 'white';
                newWhiteBall.style.display = 'inline-block';
                newWhiteBall.style.position = 'absolute';
                newWhiteBall.style.left = '55%'; // Position horizontale au centre
                
                newWhiteBall.style.transform = 'translate(-50%, -50%)'; // Centrage parfait
                
                scoreDisplay.appendChild(newWhiteBall);
            }
        }
    }
});
