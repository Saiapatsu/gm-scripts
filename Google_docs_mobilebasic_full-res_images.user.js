// ==UserScript==
// @name        Google docs mobilebasic full-res images
// @namespace   Wist
// @include     https://docs.google.com/document/d/*/mobilebasic*
// @version     1
// @grant       none
// ==/UserScript==

// Un-thumbnail every image (fragile, may break when Google changes the
// max size of a thumbnail from 800 to something else)
Array.forEach(document.getElementsByTagName("img"), node => {
	node.src = node.src.replace(/=s800/, "=s0");
});

// Strip Google redirector from links
Array.forEach(document.getElementsByTagName("a"), a => {
	if (!a.href) return;
	const url = new URL(a.href);
	const q = url.searchParams.get("q");
	if (!q) return;
	a.href = new URL(q).searchParams.get("q");
});

// Remove app-container's scrollbar
document.getElementsByClassName("app-container")[0].style.overflow = "unset";
