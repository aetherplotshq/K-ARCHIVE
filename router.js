/**
 * 2026 K ARCHIVE | Navigation Router
 * Manages page transitions and deep-linking between asset sections.
 * Ensures luxury flow and prevents erratic browser behavior.
 */

const Router = {
    /**
     * Smoothly navigates to a new section with a fade-out effect.
     * @param {string} url - The target internal URL.
     */
    navigateTo: (url) => {
        // Luxury Transition: Fade out content before switching
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
        
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    },

    /**
     * Validates if the user is attempting to access a restricted section.
     * Used mainly for auto-redirecting to index if a section is decommissioned.
     */
    init: () => {
        // Intercept all clicks on 'a' tags with specific data attribute
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (target && target.getAttribute('href') && !target.getAttribute('target')) {
                const href = target.getAttribute('href');
                
                // If it's an internal link, use the smooth router
                if (href.startsWith('sections/') || href === 'index.html' || href === '/') {
                    e.preventDefault();
                    Router.navigateTo(href);
                }
            }
        });

        // Restore visibility on page load
        window.addEventListener('pageshow', () => {
            document.body.style.opacity = '1';
        });
    }
};

// Start the router when the DOM is ready
document.addEventListener('DOMContentLoaded', Router.init);

export default Router; 
