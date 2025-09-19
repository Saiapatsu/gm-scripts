// ==UserScript==
// @name        Devforum discourse unsupported browser spoofer
// @namespace   Wist
// @include     https://devforum.roblox.com/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

Object.defineProperty(window, "unsupportedBrowser", {
	configurable: true, // allow removing this getter/setter later
	get: () => undefined,
	set: value => undefined,
});
