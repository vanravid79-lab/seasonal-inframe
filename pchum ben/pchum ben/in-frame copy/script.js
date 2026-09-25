let adsClosed = false;
let hideTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    const topAd = document.querySelector('.ad-top-fixed');
    const closeBtn = document.getElementById('closeAdsBtn');

    // Bind close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAllAds);
    }

    // Auto-hide the top ad smoothly after 2 seconds on page load
    if (topAd) {
        hideTimeout = setTimeout(() => {
            if (adsClosed) return;
            topAd.classList.add('hidden-ad');
            document.body.classList.add('no-top-ad');
        }, 2000);
    }
});

// Hide the top ad when the user scrolls down
window.addEventListener('scroll', () => {
    const topAd = document.querySelector('.ad-top-fixed');
    if (!topAd || adsClosed) return;

    if (window.scrollY > 100) {
        // When scrolling down, hide the top ad and remove top padding
        clearTimeout(hideTimeout);
        topAd.classList.add('hidden-ad');
        document.body.classList.add('no-top-ad');

        // Optional: If you want it completely removed from layout via display: none:
        // topAd.style.display = 'none';
    } else {
        // Optional: If user scrolls back to the very top (0), show it again
        topAd.classList.remove('hidden-ad');
        document.body.classList.remove('no-top-ad');
        // topAd.style.display = 'block';
    }
});

// Close both ads completely when the close button is clicked
function closeAllAds() {
    adsClosed = true;
    clearTimeout(hideTimeout); // Clear timer if user manually closes

    const topAd = document.querySelector('.ad-top-fixed');
    const bottomAd = document.querySelector('.ad-bottom-fixed');

    if (topAd) {
        topAd.classList.add('hidden-ad');
        topAd.style.display = 'none'; // Completely hide
    }
    if (bottomAd) {
        bottomAd.style.display = 'none';
    }

    // Apply classes/styles to clear spacing
    document.body.classList.add('no-top-ad');
    document.body.style.paddingBottom = '0';
}