// ==UserScript==
// @name         Azure Nav Highlighter
// @namespace    https://github.com/BenDutton/AzureNavHighlighter
// @version      1.1.0
// @description  Highlight the Azure nav bar based off the current environment
// @author       Benjamin Dutton
// @match        https://*.portal.azure.com/*
// @updateURL    https://raw.githubusercontent.com/BenDutton/AzureNavHighlighter/master/script.js
// @downloadURL  https://raw.githubusercontent.com/BenDutton/AzureNavHighlighter/master/script.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";

    const SELECTORS = {
        topBar: ".fxs-topbar",
        tenant: ".fxs-avatarmenu-tenant",
        username: ".fxs-avatarmenu-username",
    };

    const POLL_INTERVAL_MS = 100;

    function intToHex(num) {
        const hex = (num & 0x00ffffff).toString(16).toUpperCase();
        return hex.padStart(6, "0");
    }

    function stringToRGB(str) {
        let hash = 0;
        for (const char of str) {
            hash = char.charCodeAt(0) + ((hash << 5) - hash);
        }
        return `#${intToHex(hash)}`;
    }

    function getElementText(selector) {
        const element = document.querySelector(selector);
        return element?.textContent ?? "";
    }

    function updateTopBar(tenant, username) {
        const topBar = document.querySelector(SELECTORS.topBar);
        if (topBar) {
            topBar.style.background = `linear-gradient(90deg, ${stringToRGB(username)}, ${stringToRGB(tenant)})`;
        }
    }

    function waitForElements() {
        const tenant = getElementText(SELECTORS.tenant);
        const username = getElementText(SELECTORS.username);
        if (tenant.length > 0 && username.length > 0) {
            updateTopBar(tenant, username);
        } else {
            setTimeout(waitForElements, POLL_INTERVAL_MS);
        }
    }

    waitForElements();
})();
