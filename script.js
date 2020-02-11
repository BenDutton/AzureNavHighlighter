// ==UserScript==
// @name         Azure
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Me
// @match      https://*.portal.azure.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

function updateTopBar() {
    let topBar = document.getElementsByClassName("fxs-topbar")[0];
    const tenant = document.getElementsByClassName("fxs-avatarmenu-tenant")[0].textContent;
    const username = document.getElementsByClassName("fxs-avatarmenu-username")[0].textContent;

    console.log(tenant,username);

    topBar.style.background = `linear-gradient(90deg, ${stringToRGB(tenant)}, ${stringToRGB(username)})`
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
    console.log('wait');
    if (done)
        return;
    else if (
        document.getElementsByClassName("fxs-avatarmenu-tenant").length > 0 &&
        document.getElementsByClassName("fxs-avatarmenu-username").length > 0 &&
        document.getElementsByClassName("fxs-avatarmenu-tenant")[0].textContent.length > 0 &&
        document.getElementsByClassName("fxs-avatarmenu-username")[0].textContent.length > 0
    ){
        console.log(document.getElementsByClassName("fxs-avatarmenu-tenant")[0].textContent.length,document.getElementsByClassName("fxs-avatarmenu-username")[0].textContent.length);
        updateTopBar();
        done = true;
    } else {
        console.log('ASD');
        setTimeout(waitCycle,100);
        return;
    }
}

waitCycle();
