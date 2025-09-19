// ==UserScript==
// @name        Google Docs mobilebasic
// @namespace   Wist
// @include     https://docs.google.com/document/d/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

;(()=>{
	if (document.location.pathname.match(/[^\/]*$/)[0] !== "mobilebasic") {
		
		// Redirect to mobilebasic mode
		window.stop();
		document.location.pathname = document.location.pathname.replace(/[^\/]*$/, "mobilebasic");
		
	}
})();