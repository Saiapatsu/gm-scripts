// ==UserScript==
// @name        Google docs mobilebasic full-res images
// @namespace   Wist
// @include     http*://docs.google.com/document/d/*/mobilebasic*
// @version     1
// @grant       none
// ==/UserScript==

Array.forEach(document.getElementsByTagName("img"), node => {
	node.src = node.src.replace(/=s800/, "=s0");
});

Array.forEach(document.getElementsByTagName("a"), a => {
	if (!a.href) return;
	const url = new URL(a.href);
	const q = url.searchParams.get("q");
	if (!q) return;
	a.href = new URL(q).searchParams.get("q");
});
