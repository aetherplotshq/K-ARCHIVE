/**
 * 2026 K ARCHIVE | Global WhatsApp Engine
 * Generates structured, high-conversion payloads for the Concierge service.
 * Handles deep-linking for mobile and desktop environments.
 */

const WhatsApp = {
    // Primary Concierge Contact
    CONTACT_NUMBER: "+8801576940717",

    /**
     * Generates a pre-filled WhatsApp link based on user selection.
     * @param {Object} data - Contains sectionName, plotIds, and totalValuation
     */
    generateLink: (data) => {
        const { sectionName, plotIds, totalValuation } = data;
        
        // Formatting the asset list for readability
        const assetList = plotIds.join(', ');
        
        // Luxury Message Template
        const message = `*2026 K ARCHIVE | ACQUISITION REQUEST*
----------------------------------------
*Asset Class:* ${sectionName.toUpperCase()}
*Identified Plots:* ${assetList}
*Total Valuation:* $${totalValuation}
----------------------------------------
I have prepared the following for verification:
1. High-Resolution Asset (4K)
2. Digital Identity (Owner Name)
3. Destination URL

*Please initiate the secure acquisition process.*`;

        const encodedMessage = encodeURIComponent(message);
        const cleanNumber = WhatsApp.CONTACT_NUMBER.replace(/\+/g, '');
        
        // Returns the deep link
        return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    },

    /**
     * Directly opens the WhatsApp link in a new tab.
     */
    openConcierge: (payload) => {
        const link = WhatsApp.generateLink(payload);
        
        // Luxury UX: Slight delay to simulate security check
        setTimeout(() => {
            window.open(link, '_blank');
        }, 500);
    }
};

export default WhatsApp;
