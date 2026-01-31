    /* OrbitHand — main.js
   Progressive enhancement uniquement.
   Le site reste lisible et navigable sans JS (menu checkbox, details FAQ, galerie scroll).
*/

(function () {
  document.documentElement.classList.add('js');

  // Mobile nav enhancement: fermer le menu après clic sur un lien.
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      // Ferme le menu seulement en mode mobile (checkbox visible).
      navToggle.checked = false;
    });

    // Fermer avec Escape (si ouvert)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') navToggle.checked = false;
    });
  }

  // FAQ enhancement (optionnel): une seule question ouverte à la fois
  const accordionRoot = document.querySelector('[data-accordion="root"]');
  if (accordionRoot) {
    const items = Array.from(accordionRoot.querySelectorAll('details'));
    items.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (!d.open) return;
        items.forEach((other) => {
          if (other !== d) other.open = false;
        });
      });
    });
  }

  // Gallery enhancement: flèches qui scrollent le track par "page"
  const galleryTrack = document.querySelector('[data-gallery="track"]');
  const btnPrev = document.querySelector('[data-gallery="prev"]');
  const btnNext = document.querySelector('[data-gallery="next"]');

  function scrollGallery(direction) {
    if (!galleryTrack) return;
    const item = galleryTrack.querySelector('.gallery-item');
    const step = item ? item.getBoundingClientRect().width + 16 : galleryTrack.clientWidth;
    galleryTrack.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  if (galleryTrack && btnPrev && btnNext) {
    // Remplace le comportement d’ancre par du scroll doux
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      scrollGallery(-1);
    });
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      scrollGallery(1);
    });
  }

  // Reveal on scroll (IntersectionObserver)
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: tout afficher
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
