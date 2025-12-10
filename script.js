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

    function intToColorHex(num) {
        const hex = (num & 0x00ffffff).toString(16).toUpperCase();
        return hex.padStart(6, "0");
    }

    function stringToRGB(str) {
        let hash = 0;
        for (const char of str) {
            hash = char.charCodeAt(0) + ((hash << 5) - hash);
        }
        return `#${intToColorHex(hash)}`;
    }

    function getElementText(selector) {
        const element = document.querySelector(selector);
        return element?.textContent ?? "";
    }

    function updateTopBar() {
        const topBar = document.querySelector(SELECTORS.topBar);
        const tenant = getElementText(SELECTORS.tenant);
        const username = getElementText(SELECTORS.username);

        if (topBar) {
            topBar.style.background = `linear-gradient(90deg, ${stringToRGB(username)}, ${stringToRGB(tenant)})`;
        }
    }

    function areElementsReady() {
        return (
            getElementText(SELECTORS.tenant).length > 0 &&
            getElementText(SELECTORS.username).length > 0
        );
    }

    function waitForElements() {
        if (areElementsReady()) {
            updateTopBar();
        } else {
            setTimeout(waitForElements, POLL_INTERVAL_MS);
        }
    }

    waitForElements();
})();
