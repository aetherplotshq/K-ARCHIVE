/**
 * 2026 K ARCHIVE | Security Guards
 * Defense layer for data integrity, session validation, and 
 * prevention of unauthorized state manipulation.
 */

import { auth } from './firebase-config.js';

const Security = {
    /**
     * Checks if the current requester has administrative privileges.
     * @returns {Promise<boolean>}
     */
    isAdmin: async () => {
        const user = auth.currentUser;
        if (!user) return false;
        
        try {
            // Force refresh token to check for admin claims if implemented
            const token = await user.getIdTokenResult();
            return !!token.claims.admin; 
        } catch (e) {
            return false;
        }
    },

    /**
     * Sanitizes plot IDs to prevent injection or structural errors.
     * Expected format: sectionId-x-y (e.0. 01-10-5)
     * @param {string} id 
     */
    validatePlotId: (id) => {
        const pattern = /^\d{2}-\d+-\d+$/;
        return pattern.test(id);
    },

    /**
     * Rate Limiting: Prevents rapid-fire requests to the Concierge.
     * Ensures the system isn't spammed by bots.
     */
    requestCooldown: (() => {
        let lastRequest = 0;
        const COOLDOWN_MS = 5000; // 5 seconds

        return () => {
            const now = Date.now();
            if (now - lastRequest < COOLDOWN_MS) {
                return false;
            }
            lastRequest = now;
            return true;
        };
    })(),

    /**
     * Blocks execution if the environment is tampered with 
     * (e.g., preventing some basic DevTools overrides).
     */
    auditEnvironment: () => {
        if (window.self !== window.top) {
            // Prevent Clickjacking (running inside an iframe)
            document.body.innerHTML = "SECURITY VIOLATION: ARCHIVE MUST BE VIEWED DIRECTLY.";
            throw new Error("Iframe bypass detected.");
        }
    }
};

// Initial lockdown
Security.auditEnvironment();

export default Security;
