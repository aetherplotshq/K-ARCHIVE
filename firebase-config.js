/**
 * 2026 K ARCHIVE | Firebase Infrastructure
 * Connects the system to the Realtime Database state registry.
 * Uses Firebase Modular SDK (v10.7.1).
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your verified Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_1YNfFWjGxvP_FTfYkLnvycyFraSk20s",
    authDomain: "k-archive-fac83.firebaseapp.com",
    databaseURL: "https://k-archive-fac83-default-rtdb.firebaseio.com",
    projectId: "k-archive-fac83",
    storageBucket: "k-archive-fac83.firebasestorage.app",
    messagingSenderId: "928982104592",
    appId: "1:928982104592:web:00be04725bdcf429852895",
    measurementId: "G-EKG8FCVEQC"
};

// Initialize Firebase Engine
const app = initializeApp(firebaseConfig);

// Initialize & Export Core Services
export const db = getDatabase(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

/** * Note: db (Realtime Database) will store plot statuses and transaction logs.
 * All access is governed by the security-guards.js logic.
 */
