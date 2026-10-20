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
	try {
		node.src = node.src.replace(/=s800/, "=s0");
	} catch(e) {
		console.log("Failed to de-thumbnail", node, e);
	}
});

// Strip Google redirector from links
Array.forEach(document.getElementsByTagName("a"), a => {
	try {
		if (!a.href) return;
		var url = new URL(a.href);;
		while (true) {
			const q = url.searchParams.get("q");
			if (q) {
				url = new URL(q);
			} else {
				a.href = url;
				return;
			}
		}
		// const url = new URL(a.href);
		// const q = url.searchParams.get("q");
		// if (!q) return;
		// a.href = new URL(q).searchParams.get("q");
	} catch(e) {
		console.log("Failed to de-redirect", a, e);
	}
});

// Improve title
try {
	function pad2(num) {
		return String(num).padStart(2, "0");
	} // snippet 255D7D58237C522D576B41465F586B78
	function formatDate14(date) {
		return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(date.getSeconds())}`;
	} // snippet 255D7D58237C522D576B41465F586B80
	window.realtitle = window.realtitle || document.title;
	// https://docs.google.com/document/d/1m1QdyxPlXHUarybL6lbNkWO05C5_acv8gUevflsRWnw/mobilebasic
	var id = document.location.pathname.match(/\/d\/([^\/]{44})\//)[1];
	document.title = `${realtitle} ${id} ${formatDate14(new Date())}`;
} catch(e) {
	console.log("Failed to fix title", e);
}

// Remove app-container's scrollbar
document.getElementsByClassName("app-container")[0].style.overflow = "unset";

// Remove sticky header
document.getElementById("docs-ml-header-id").remove();
