// ==UserScript==
// @name        YouTube RSS thumbnails
// @namespace   Wist
// @description Thumbnails in RSS feed
// @include     https://www.youtube.com/feeds/videos.xml?*
// @version     1
// @grant       none
// ==/UserScript==

(()=>{
	// insert css
	const style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = `
.entry {
	width: 320px;
	height: 180px;
	display: inline-block;
	float: left; /* Really ought to be flex */
	margin: 0px 4px 80px 4px;
} img {
	width: 320px;
	height: 160px;
	
}`;
	document.head.append(style);
	
	document.getElementById("feedTitleLink").remove();
	
	const feed = document.querySelector("#feedContent");
	var clearFound = false;
	
	// insert videos link
	const backlink = document.createElement("a");
	backlink.href = "https://www.youtube.com/channel/" + window.location.search.match(/=(.*)/)[1] + "/videos";
	backlink.innerText = "To Videos";
	document.getElementById("feedTitleContainer").append(backlink);
	
	function hash(key) {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash;
	}
	
	// const preferred_instances = [
	// // /*
		// "https://inv.riverside.rocks/",
		// "https://vid.puffyan.us/", // invidious.namazso.eu
		// "https://yt.artemislena.eu/", // "https://invidious.osi.kr/",
		// "https://yewtu.be/", // "https://invidious.snopyta.org/",
	// // */
		// // "http://i/",
	// ];
	
	function feeditem(node) {
		if (node.className === "entry") {
			const anchor = node.querySelector("a");
			const href = anchor.href;
			const url = new URL(href);
			const videoID = url.searchParams.get("v");
			// add invidious alternate link
			// const invidious = anchor.cloneNode();
			// invidious.innerText = "[YouTube]";
			// invidious.href = anchor.href;
			// node.firstElementChild.append(invidious);
			// anchor.href = preferred_instances[hash(videoID) % preferred_instances.length] + "watch?v=" + videoID;
			// url.hostname = "i";
			// url.protocol = "http:";
			// anchor.href = url.href;
			// add thumbnails
			const img = document.createElement("img");
			img.src = `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
			// anchor.prepend(document.createElement("br"));
			anchor.prepend(img);
			
		} else if (!clearFound) {
			// keep just one float clearer
			clearFound = true;
			feed.parentNode.append(node);
			
		} else {
			// remove float clearers
			node.remove();
			
		}
	}
	
	new MutationObserver((mutations, observer)=>{
		for (mutation of mutations) {
			if (!mutation.addedNodes) {
				console.log("asd");
				continue;
			}
			
			for (node of mutation.addedNodes)
				feeditem(node);
			
		}
		
	}).observe(feed, {
		childList: true
	});
	
	for (const node of feed.querySelectorAll("a")) {
		feeditem(node);
		
	}
	
})();