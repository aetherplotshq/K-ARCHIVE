/**
 * 2026 K ARCHIVE | UI Helper Library
 * Utility functions for luxury interface behavior, formatting, 
 * and refined micro-interactions.
 */

const UI = {
    /**
     * Formats numbers into a professional USD currency display.
     * @param {number} amount 
     * @returns {string} - e.g., "$1,500"
     */
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    },

    /**
     * Displays a refined, minimalist status message.
     * Avoids aggressive alerts in favor of elegant HUD updates.
     * @param {string} message 
     * @param {string} type - 'info', 'gold', 'error'
     */
    notify: (message, type = 'info') => {
        const hud = document.querySelector('.vault-status');
        if (!hud) return;

        const originalText = hud.innerHTML;
        const color = type === 'gold' ? '#C5A059' : (type === 'error' ? '#FF4B4B' : '#00FF00');
        
        // Update HUD with a fade effect
        hud.style.opacity = '0';
        setTimeout(() => {
            hud.innerHTML = `<span class="status-dot" style="background:${color}; box-shadow: 0 0 10px ${color}"></span> ${message.toUpperCase()}`;
            hud.style.opacity = '1';
        }, 300);

        // Revert back after 4 seconds
        setTimeout(() => {
            hud.style.opacity = '0';
            setTimeout(() => {
                hud.innerHTML = originalText;
                hud.style.opacity = '1';
            }, 300);
        }, 4000);
    },

    /**
     * Animates the entry of grid elements for a smooth, sequential reveal.
     * @param {HTMLElement} element 
     * @param {number} delay 
     */
    staggerReveal: (element, delay = 0) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    },

    /**
     * Copy text to clipboard with a high-end confirmation.
     * @param {string} text 
     */
    copyVaultData: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            UI.notify("DATA SECURED TO CLIPBOARD", "gold");
        } catch (err) {
            UI.notify("COPY FAILED", "error");
        }
    }
};

export default UI;
