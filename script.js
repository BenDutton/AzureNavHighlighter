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

function updateTopBar() {
    let topBar = document.getElementsByClassName("fxs-topbar")[0];
    const tenant = document.getElementsByClassName("fxs-avatarmenu-tenant")[0].textContent;
    const username = document.getElementsByClassName("fxs-avatarmenu-username")[0].textContent;

    topBar.style.background = `linear-gradient(90deg, ${stringToRGB(username)}, ${stringToRGB(tenant)})`
}

function stringToRGB(str) {

    function intToRGB(i){
        var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }

    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `#${intToRGB(hash)}`;
}

let done = false;
function waitCycle(){
    if (done)
        return;
    else if (
        document.getElementsByClassName("fxs-avatarmenu-tenant").length > 0 &&
        document.getElementsByClassName("fxs-avatarmenu-username").length > 0 &&
        document.getElementsByClassName("fxs-avatarmenu-tenant")[0].textContent.length > 0 &&
        document.getElementsByClassName("fxs-avatarmenu-username")[0].textContent.length > 0
    ){
        updateTopBar();
        done = true;
    } else {
        setTimeout(waitCycle,100);
        return;
    }
}

waitCycle();
