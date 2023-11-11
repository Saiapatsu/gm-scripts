// ==UserScript==
// @name        Google docs mobilebasic full-res images
// @namespace   Wist
// @include     http*://docs.google.com/document/d/*/mobilebasic*
// @version     1
// @grant       none
// ==/UserScript==

Array.forEach(document.getElementsByTagName("img"), node => {
	node.src = node.src.replace(/=s800$/, "=s0");
});

Array.forEach(document.getElementsByTagName("a"), a => {
	const url = new URL(a.href);
	if (!url.searchParams.get("q")) return;
	const url2 = new URL(url.searchParams.get("q"));
	a.href = url2.searchParams.get("q");
});
