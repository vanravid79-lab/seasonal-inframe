let adsClosed = false;
let hideTimeout = null;
let lastScrollY = window.pageYOffset || window.scrollY;

document.addEventListener('DOMContentLoaded', () => {
    const topAd = document.querySelector('.ad-top-fixed');
    const closeBtn = document.getElementById('closeAdsBtn');

    // Bind close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAllAds);
    }

    // Auto-hide the top ad smoothly after 4 seconds on page load
    if (topAd) {
        hideTimeout = setTimeout(() => {
            if (adsClosed) return;
            topAd.classList.add('hidden-ad');
            document.body.classList.add('no-top-ad');
        }, 4000);
    }
});

// Handle show on scroll down, hide on scroll up for the top ad
window.addEventListener('scroll', () => {
    const topAd = document.querySelector('.ad-top-fixed');
    if (!topAd || adsClosed) return;

    const currentScrollY = window.pageYOffset || window.scrollY;

    // Clear auto-hide timeout if user starts scrolling manually
    clearTimeout(hideTimeout);

    if (currentScrollY <= 0) {
        // At the very top of the page -> keep top ad hidden
        topAd.classList.add('hidden-ad');
        document.body.classList.add('no-top-ad');
    } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> show top ad
        topAd.classList.remove('hidden-ad');
        document.body.classList.remove('no-top-ad');
    } else {
        // Scrolling up -> hide top ad
        topAd.classList.add('hidden-ad');
        document.body.classList.add('no-top-ad');
    }

    lastScrollY = currentScrollY;
});

// Close both ads completely when the close button is clicked
function closeAllAds() {
    adsClosed = true;
    clearTimeout(hideTimeout); // Clear timer if user manually closes

    const topAd = document.querySelector('.ad-top-fixed');
    const bottomAd = document.querySelector('.ad-bottom-fixed');

    if (topAd) {
        topAd.classList.add('hidden-ad');
        topAd.style.display = 'none'; // Completely hide from layout
    }
    if (bottomAd) {
        bottomAd.style.display = 'none';
    }

    // Apply classes/styles to clear spacing
    document.body.classList.add('no-top-ad');
    document.body.style.paddingBottom = '0';
}