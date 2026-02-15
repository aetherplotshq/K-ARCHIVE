/**
 * 2026 K ARCHIVE | Asset Preloader
 * Orchestrates background loading of critical UI assets to ensure 
 * instantaneous transitions between archive sections.
 */

const Preloader = {
    // List of core assets that must be ready for a luxury experience
    criticalAssets: [
        'assets/icons/logo.svg',
        'assets/icons/whatsapp.svg',
        'global.css',
        'global-reset.css'
    ],

    /**
     * Initializes preloading logic
     */
    init: function() {
        console.log("Archive Preload Sequence Initiated...");
        
        // Load critical UI elements
        this.criticalAssets.forEach(asset => {
            this.loadAsset(asset);
        });

        // Pre-establish connection to Firebase for faster first-read
        this.warmUpDatabase();
    },

    /**
     * Injects a link tag into the head to tell the browser to fetch assets
     * @param {string} url 
     */
    loadAsset: function(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch'; // Low priority background fetch
        link.href = url;
        document.head.appendChild(link);
    },

    /**
     * Trigger a silent ping to Firebase to reduce handshake time on grid load
     */
    warmUpDatabase: async () => {
        try {
            // Importing dynamic to avoid blocking main thread
            const { db } = await import('./firebase-config.js');
            console.log("Vault Connection: Warm");
        } catch (e) {
            // Fail silently, high-end systems don't show errors to users
        }
    }
};

// Execute preloading after the main window is interactive
window.addEventListener('load', () => {
    // Delay preloading slightly to prioritize the current page's paint
    setTimeout(() => Preloader.init(), 1000);
});

export default Preloader;
