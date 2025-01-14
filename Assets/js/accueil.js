// // Fonction pour détecter si l'appareil est mobile
// function estMobile() {
//     return window.innerWidth <= 500 || 'ontouchstart' in window; // Taille écran ou tactile
// }

// // Sélectionne les éléments
// const accueilContainer = document.getElementById('accueilContainer');
// const ctaButton = document.querySelector('.accueil-button');

// // Vérifie si c'est un appareil mobile
// if (estMobile()) {
//     // Affiche le container sur mobile
//     accueilContainer.style.display = 'flex'; // Important pour l'animation CSS
//     accueilContainer.style.visibility = 'visible';
// accueilContainer.style.opacity = '1';


//     // Ajoute un événement sur le bouton
//     ctaButton.addEventListener('click', () => {
//         accueilContainer.classList.add('fade-out'); // Ajoute l'animation fade-out

//         setTimeout(() => {
//             accueilContainer.style.display = 'none'; // Cache après l'animation
//         }, 500); // Correspond à la durée de l'animation CSS
//     });
// } else {
//     // Cache le container sur les appareils non mobiles
//     accueilContainer.style.display = 'none';
// }
