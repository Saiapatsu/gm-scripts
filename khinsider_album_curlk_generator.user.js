// ==UserScript==
// @name        khinsider album curlk generator
// @namespace   Wist
// @include     https://downloads.khinsider.com/game-soundtracks/album/*
// @version     1
// @grant       none
// ==/UserScript==

;(()=>{

const slug_real = location.pathname.match(/^\/game-soundtracks\/album\/([^\/]+)/)[1];
const slug = slug_real.replaceAll(/[^a-zA-Z0-9_-]/g, "-");
const slug_wtf = slug !== slug_real;

// Extract player's track list
const playerpack = document.getElementById("pageContent").firstElementChild.innerText;
const playerunpack = eval(playerpack.slice(4));
const tracksJsonStr = playerunpack.match(/tracks=(\[\{.*?\}),\],trackCount/)[1] + "]";
const tracksJsonParsed = JSON.parse(tracksJsonStr);

window.tracks = tracksJsonParsed;

function urloutput(href) {
	const decoded = decodeURIComponent(href.slice(href.lastIndexOf("/") + 1));
	if (/["<>|&]/.test(decoded)) return "# " + href;
	return `url=${href}\noutput="${decoded}"`;
}

const curlk = [
	"--globoff",
	"--skip-existing",
	`--output-dir ${slug}`,
	`--dump-header ${slug}\\headers.txt`,
	`url=https://downloads.khinsider.com/game-soundtracks/album/${slug}`,
	"output=index.html",
	`url=https://downloads.khinsider.com/game-soundtracks/album/${slug}/change_log`,
	"output=change_log.html",
	`url=https://vgmtreasurechest.com/soundtracks/${slug}/khinsider.info.txt`,
	// Cover images
	...Array.map(document.getElementsByClassName("albumImage"), x => urloutput(x.firstElementChild.href)),
	// Tracks
	...tracks.map(x => urloutput("https://" + x.file)),
	"",
];

if (slug_wtf) curlk.unshift("# Original slug: " + slug_real);

console.log(curlk);

var curlkOut = document.getElementById("curlk");

if (!curlkOut) {
	curlkOut = document.createElement("textarea");
	curlkOut.id = "curlk";
	curlkOut.style = "width:100%;height:20em;";
	const amd = document.getElementsByClassName("albumMassDownload")[0];
	amd.parentNode.insertBefore(curlkOut, amd);
	curlkOut.value = curlk.join("\n");
}

curlkOut.value = curlk.join("\n");

})();
