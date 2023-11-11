// ==UserScript==
// @name        Google docs mobilebasic full-res images
// @namespace   Wist
// @include     http*://docs.google.com/document/d/*/mobilebasic*
// @version     1
// @grant       none
// ==/UserScript==

Array.from(document.getElementsByTagName("img")).forEach(node=>node.src = node.src.replace(/=s800$/, "=s0"));
