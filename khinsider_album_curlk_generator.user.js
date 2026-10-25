// ==UserScript==
// @name        khinsider album curlk generator
// @namespace   Wist
// @include     https://downloads.khinsider.com/game-soundtracks/album/*
// @version     1
// @grant       none
// ==/UserScript==

;(()=>{

const slugUrl = location.pathname.match(/^\/game-soundtracks\/album\/([^\/]+)/)[1];
const slugSlugged = slugUrl.replaceAll(/[^a-zA-Z0-9_-]/g, "-");
const slugWasModified = slugSlugged !== slugUrl;
const slugDir = slugSlugged + " ;khinsider";

// Extract player's track list
const playerpack = document.getElementById("pageContent").firstElementChild.innerText;
const playerunpack = eval(playerpack.slice(4));
const tracksJsonStr = playerunpack.match(/tracks=(\[\{.*?\}),\],trackCount/)[1] + "]";
const tracksJsonParsed = JSON.parse(tracksJsonStr);

window.tracks = tracksJsonParsed;

const comments = [
	"# Replace .mp3 with .flac or .mid as needed",
	"# Cloudflare applies to the album page and its changelog, you need to use your browser for those",
];

if (slugWasModified) comments.push("# Original slug: " + slugUrl);

const urlIndex     = `https://downloads.khinsider.com/game-soundtracks/album/${slugUrl}`;
const urlChangelog = `https://downloads.khinsider.com/game-soundtracks/album/${slugUrl}/change_log`;
const wdl = [
	{name: "index.html", url: urlIndex},
	{name: "change_log.html", url: urlChangelog},
];

const curlk = [
	comments,
	`# wist.download(${JSON.stringify(wdl).replaceAll("\n", "")}, ${JSON.stringify(slugDir)})`,
	"--globoff",
	"--location",
	"--skip-existing",
	"--create-dirs",
	`--output-dir ${slugDir}`,
	`--dump-header ${slugDir}/headers.txt`,
	`# url=${urlIndex}`,
	"# output=index.html",
	`# url=${urlChangelog}`,
	"# output=change_log.html",
	`url=https://vgmtreasurechest.com/soundtracks/${slugUrl}/khinsider.info.txt`,
	"output=khinsider.info.txt",
	Array.map(document.getElementsByClassName("albumImage"), x => urloutput(x.firstElementChild.href)),
	tracks.map(x => urloutput("https://" + x.file)),
	"",
].flat();

function urloutput(href) {
	const decoded = decodeURIComponent(href.slice(href.lastIndexOf("/") + 1));
	if (/["<>|&\/\\]/.test(decoded)) {
		comments.push("# " + href);
		return "# " + href;
	}
	return `url=${href}\noutput="${decoded}"`;
}

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
