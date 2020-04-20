var overlay=document.createElement("div");
overlay.id="overlay";

overlay.insertAdjacentHTML('afterbegin', `
<div>
    <span class='class123'>Basketty</span>
</div>
`);
document.body.appendChild(overlay);

chrome.runtime.sendMessage({msg: 'hi from content'}, function(resp) {
    console.log(resp);
});
